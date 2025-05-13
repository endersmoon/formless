import { useState, useEffect } from 'react';
import jobData from '../category.json';

export const useJobTitleSearch = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  useEffect(() => {
    if (title.trim() === "") {
      setFilteredTitles([]);
      return;
    }
    
    const filtered = jobData
      .filter(job => job.job_title.toLowerCase().includes(title.toLowerCase()))
      .map(job => job.job_title);
    
    setFilteredTitles(filtered.slice(0, 10));
  }, [title]);

  const handleTitleSelect = (selectedTitle) => {
    setTitle(selectedTitle);
    const selectedJob = jobData.find(job => job.job_title === selectedTitle);
    if (selectedJob) {
      setCategory(selectedJob.category);
    }
    setShowTitleDropdown(false);
  };

  const categories = [...new Set(jobData.map(job => job.category))].sort();

  return {
    title,
    setTitle,
    category,
    setCategory,
    filteredTitles,
    showTitleDropdown,
    setShowTitleDropdown,
    handleTitleSelect,
    categories
  };
}; 