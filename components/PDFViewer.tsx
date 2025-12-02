import React from "react";
import { useParams } from "react-router-dom";

const PDFViewer: React.FC = () => {
  const { file } = useParams<{ file: string }>();
  const basePath = `/notes/${file}`;

  // PDF open params: hide toolbar when supported and fit page to height
  const iframeSrc = `${basePath}#toolbar=0&view=FitH`;

  return (
    <div className="relative bg-[#0f172a] text-gray-300 w-full h-screen overflow-hidden">
      {/* Back button overlay (visible on all screen sizes) */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded-lg text-xs sm:text-sm shadow-md border border-[#1d4ed8]/60 transition"
        aria-label="Back"
      >
        <span className="text-base leading-none">←</span>
        <span>Back to Topics</span>
      </button>

      {/* Viewer area - full-viewport on all devices */}
      <div className="absolute inset-0 w-full h-full">
        <object
          data={iframeSrc}
          type="application/pdf"
          width="100%"
          height="100%"
          aria-label={file}
          className="w-full h-full bg-white block"
        >
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-200">
            <p className="mb-4">Your browser does not support inline PDFs.</p>
            <a
              href={basePath}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 rounded text-white"
            >
              Open PDF in new tab
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default PDFViewer;
