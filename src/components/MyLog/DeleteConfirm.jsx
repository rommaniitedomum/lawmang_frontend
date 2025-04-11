import React from "react";

const DeleteConfirm = ({ isOpen, onClose, onConfirm, type = "memo" }) => {
  if (!isOpen) return null;

  const messages = {
    memo: {
      title: "메모를 삭제하시겠습니까?",
      subtitle: "삭제된 메모는 복구할 수 없습니다.",
    },
    viewLog: {
      title: "열람기록을 삭제하시겠습니까?",
      subtitle: "삭제된 열람기록은 복구할 수 없습니다.",
    },
    viewLogAll: {
      title: "열람기록을 모두 삭제하시겠습니까?",
      subtitle: "삭제된 열람기록은 복구할 수 없습니다.",
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl w-[80%] sm:w-[400px] p-4 sm:p-6 shadow-lg">
        {/* 경고 아이콘 */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f1f1f0] flex items-center justify-center">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* 메시지 */}
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
            {messages[type].title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {messages[type].subtitle}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-Main text-white rounded-lg hover:bg-Main_hover transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
