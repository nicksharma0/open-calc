import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './LessonViewer.css';

const LessonViewer = ({ darkMode }) => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonOrder, setLessonOrder] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setError(null);
      setMarkdown('');
      setLessonTitle('');
      setLessonOrder([]);
      setCurrentIdx(-1);
      try {
        // Fetch the unit overview JSON to get the lesson file and title
        const unitRes = await fetch(`${process.env.PUBLIC_URL}/content/units/${unitId}/unit-overview.json`);
        if (!unitRes.ok) throw new Error('Unit not found');
        const unitData = await unitRes.json();
        const lessons = unitData.lessons || [];
        setLessonOrder(lessons);
        const idx = lessons.findIndex(l => l.id === lessonId);
        setCurrentIdx(idx);
        if (idx === -1) throw new Error('Lesson not found');
        const lesson = lessons[idx];
        setLessonTitle(lesson.title);
        // Fetch the markdown file
        const mdRes = await fetch(`${process.env.PUBLIC_URL}/content/units/${unitId}/${lesson.file}`);
        const md = await mdRes.text();
        if (
          !mdRes.ok ||
          mdRes.headers.get('content-type')?.includes('text/html') ||
          md.trim().startsWith('<!DOCTYPE html>')
        ) {
          throw new Error('notfound');
        }
        setMarkdown(md);
      } catch (err) {
        if (err.message === 'notfound') {
          setError('inprogress');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [unitId, lessonId]);

  const handleBack = () => {
    if (currentIdx > 0) {
      navigate(`/units/${unitId}/lessons/${lessonOrder[currentIdx - 1].id}`);
    }
  };
  const handleNext = () => {
    if (currentIdx !== -1 && currentIdx < lessonOrder.length - 1) {
      navigate(`/units/${unitId}/lessons/${lessonOrder[currentIdx + 1].id}`);
    }
  };
  const handleExit = () => {
    navigate(`/units/${unitId}`);
  };

  return (
    <div className={`lesson-viewer${darkMode ? ' dark' : ''}`}>
      <div className="lesson-exit-row">
        <button className="nav-btn exit-btn" onClick={handleExit}>← Exit to Unit Overview</button>
      </div>
      {loading ? (
        <div className="lesson-loading">Loading lesson...</div>
      ) : error === 'inprogress' ? (
        <div className="lesson-error">
          <h2>This lesson page is in progress.</h2>
          <p>Please check back later or email <a href="mailto:contact.opencalc@gmail.com">contact.opencalc@gmail.com</a> for help.</p>
        </div>
      ) : error ? (
        <div className="lesson-error">Error: {error}</div>
      ) : (
        <>
          <h1 className="lesson-title">{lessonTitle}</h1>
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={{
              img: ({ src, alt, ...props }) => (
                <img 
                  src={src?.startsWith('http') ? src : `${process.env.PUBLIC_URL}/content/units/${unitId}/${src}`}
                  alt={alt}
                  {...props}
                />
              ),
              table: ({ children, ...props }) => (
                <table className="lesson-table" {...props}>
                  {children}
                </table>
              ),
              th: ({ children, ...props }) => (
                <th className="lesson-th" {...props}>
                  {children}
                </th>
              ),
              td: ({ children, ...props }) => (
                <td className="lesson-td" {...props}>
                  {children}
                </td>
              )
            }}
          />
        </>
      )}
      <div className="lesson-navigation">
        <button className="nav-btn back-btn" onClick={handleBack} disabled={currentIdx <= 0}>← Back</button>
        <button className="nav-btn next-btn" onClick={handleNext} disabled={currentIdx === -1 || currentIdx >= lessonOrder.length - 1}>Next →</button>
      </div>
    </div>
  );
};

export default LessonViewer; 