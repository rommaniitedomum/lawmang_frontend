import React, { useEffect } from "react";
import loadingGif from "../../assets/loading.gif";

const Popup = ({ isOpen, onClose, summary }) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.dispatchEvent(
        new CustomEvent("modalState", { detail: { isOpen: true } })
      );
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(
        new CustomEvent("modalState", { detail: { isOpen: false } })
      );
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 요약 내용을 섹션별로 분리하는 함수
  const formatSummary = (text) => {
    if (!text) return [];

    // 섹션 제목 패턴 (예: "【사건개요】", "【판결요지】" 등)
    const formattedSections = [];
    const matches = text.match(/【[^】]+】[^【]*/g) || [];

    matches.forEach((match) => {
      const titleMatch = match.match(/【([^】]+)】/);
      if (titleMatch) {
        const title = titleMatch[1];
        const content = match.replace(/【[^】]+】/, "").trim();
        formattedSections.push({ title, content });
      }
    });

    return formattedSections;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 팝업 컨텐츠 */}
      <div className="relative bg-white w-[90%] sm:w-[900px] h-[80vh] rounded-2xl shadow-2xl transform transition-all">
        {/* 헤더 */}
        <div className="relative flex items-center justify-center p-4 sm:p-6 border-b border-gray-100 shadow-md">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
            판례 요약
          </h3>
          <button
            onClick={onClose}
            className="absolute right-4 sm:right-6 p-1 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-180"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-4 sm:p-8 h-[calc(80vh-120px)] overflow-y-auto">
          {summary === null ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src={loadingGif}
                alt="loading"
                className="w-12 sm:w-16 h-12 sm:h-16"
              />
              <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4">
                요약을 생성하고 있습니다...
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-8">
              {formatSummary(summary).map((section, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-200 shadow-md transition-shadow duration-200"
                >
                  <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-[#afaa99] flex items-center">
                    <span className="bg-[#afaa99] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm mr-2 sm:mr-3">
                      {index + 1}
                    </span>
                    {section.title}
                  </h4>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line pl-2">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 */}
      </div>
    </div>
  );
};

export default Popup;
