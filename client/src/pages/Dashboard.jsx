import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UploadModal from '../components/UploadModal';
import ConfirmModal from '../components/ConfirmModal';
import MediaModal from '../components/MediaModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    image: false,
    video: false,
    audio: false,
    pdf: false,
  });
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files/search', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (res.ok) setFiles(data.files);
    } catch (err) {
      console.error('Failed to load files');
    }
  };

  const filterFiles = useCallback(() => {
    const filtered = files.filter((f) => {
      const matchesSearch = f.tags?.join(',').toLowerCase().includes(search.toLowerCase());

      const fileType = f.fileType || '';
      const isImage = fileType.startsWith('image');
      const isVideo = fileType.startsWith('video');
      const isAudio = fileType.startsWith('audio');
      const isPdf = fileType === 'application/pdf';

      const matchesFilter =
        (!filters.image && !filters.video && !filters.audio && !filters.pdf) ||
        (filters.image && isImage) ||
        (filters.video && isVideo) ||
        (filters.audio && isAudio) ||
        (filters.pdf && isPdf);

      return matchesSearch && matchesFilter;
    });

    setFilteredFiles(filtered);
  }, [files, search, filters]);
   useEffect(() => {
    // Redirect if token is missing (user logged out)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    filterFiles();
  }, [filterFiles]);

  const promptDelete = (file) => {
    setPendingDelete(file);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    const file = pendingDelete;
    setPendingDelete(null);
    setShowConfirm(false);
    setLastDeleted(file);
    setFiles((prev) => prev.filter((f) => f._id !== file._id));
    setShowUndo(true);

    const timer = setTimeout(async () => {
      try {
        await fetch(`/api/upload/${file._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLastDeleted(null);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }, 5000);

    setUndoTimer(timer);
    setTimeout(() => setShowUndo(false), 5000);
  };

  const handleView = async (file) => {
    try {
      await fetch(`/api/upload/view/${file._id}`, { method: 'POST' });
      const updatedFile = { ...file, views: file.views + 1 };
      setSelectedFile(updatedFile);
      setFiles((prev) => prev.map((f) => (f._id === file._id ? updatedFile : f)));
    } catch (err) {
      console.error('Failed to increment view count', err);
    }
  };

  const handleUndo = () => {
    clearTimeout(undoTimer);
    setFiles((prev) => [lastDeleted, ...prev]);
    setLastDeleted(null);
    setShowUndo(false);
  };

  const toggleFilter = (type) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="dashboard-container">
      <Navbar onUploadClick={() => setShowModal(true)} />

      {showModal && <UploadModal onClose={() => setShowModal(false)} onUploadSuccess={fetchFiles} />}
      {showConfirm && pendingDelete && (
        <ConfirmModal
          message={`Are you sure you want to delete "${pendingDelete.fileName}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setPendingDelete(null);
            setShowConfirm(false);
          }}
        />
      )}
      {showUndo && (
        <div className="undo-bar">
          File deleted. <button onClick={handleUndo}>Undo</button>
        </div>
      )}
      {selectedFile && <MediaModal file={selectedFile} onClose={() => setSelectedFile(null)} />}

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <h3 className="sidebar-title">Filters</h3>
          <div className="sidebar-filters">
            <label><input type="checkbox" checked={filters.image} onChange={() => toggleFilter('image')} /> Images</label><br />
            <label><input type="checkbox" checked={filters.video} onChange={() => toggleFilter('video')} /> Videos</label><br />
            <label><input type="checkbox" checked={filters.audio} onChange={() => toggleFilter('audio')} /> Audio</label><br />
            <label><input type="checkbox" checked={filters.pdf} onChange={() => toggleFilter('pdf')} /> PDF</label>
          </div>
        </aside>

        <main className="dashboard-main">
          <input
            type="text"
            placeholder="Search by tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <div className="file-gallery">
            {filteredFiles.map((file) => (
              <div key={file._id} className={`file-card file-type-${(file.fileType || '').split('/')[0]}`}>
                {file.fileType?.startsWith('image') ? (
                  <img src={file.url} alt="media" className="file-image" />
                ) : (
                  <p className="file-name">{file.fileName}</p>
                )}

                <div className="file-card-footer">
                  <span className="file-tag-badge">{file.tags?.join(', ') || 'No tags'}</span>
                  <span className="file-type-label">{(file.fileType || '').split('/')[0]}</span>
                  <span className="file-view-count">
                    <FontAwesomeIcon icon={faEye} /> {file.views}
                  </span>
                </div>

                <button className="delete-button" onClick={() => promptDelete(file)}>Delete</button>
                {(file.fileType?.startsWith('image') || file.fileType?.startsWith('video') || file.fileType === 'application/pdf') && (
                  <button className="view-button" onClick={() => handleView(file)}>
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
