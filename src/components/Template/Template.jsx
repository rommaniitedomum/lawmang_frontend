import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import documentStructure from "../../constants/document_structure.json";
import PreviewModal from "./PreviewModal";
import DocumentSection from "./DocumentSection";
import { LuFileSearch } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React from "react";
import { Link } from "react-router-dom";
import HighlightText from "../HighlightText";

const categoryMapping = {
  all: "전체",
  administration: "행정",
  bankruptcy: "개인회생, 파산 및 면책",
  "civil execution": "민사집행",
  "civil general": "민사일반",
  "civil suit": "민사소송",
  commercial: "상사",
  "commercial building lease": "상가임대차",
  constitution: "헌법",
  contract: "계약",
  "criminal law": "형법",
  "criminal suit": "형사소송",
  damage: "손해배상",
  "domestic relation": "친족",
  etc: "기타",
  family_lawsuit: "가사소송",
  "family relation registration": "가족관계등록",
  "housing lease": "주택임대차",
  labor: "노동",
  obligation: "채권",
  "preservative measure": "보전처분",
  "real right": "물권",
  succession: "상속",
};

const Template = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const categoryContainerRef = React.useRef(null);

  // 선택된 카테고리 설정
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchTrigger(true); // ✅ 검색 실행
      setSelectedCategory("all"); // ✅ 검색 시 전체에서 검색
    }
  };

  // Enter 키 입력 핸들러
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 카테고리 선택 핸들러 수정
  const handleCategorySelect = (key) => {
    setSelectedCategory(key);
    setSearchQuery(""); // 검색어도 초기화
    setSearchTrigger(false);
    navigate(`/template/${key}`);
  };

  // ✅ `handleCategoryClick`을 `handleCategorySelect` 아래에 배치
  const handleCategoryClick = (category) => {
    handleCategorySelect(category);
  };

  // 미리보기 모달 닫기
  const handleClosePreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // 선택된 카테고리에 따라 문서 필터링
  const getDisplayDocuments = () => {
    if (selectedCategory === "all") {
      return documentStructure;
    }
    return { [selectedCategory]: documentStructure[selectedCategory] };
  };

  // 카테고리 스크롤 관련 함수들
  const scrollLeft = () => {
    if (categoryContainerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 200);
      categoryContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (categoryContainerRef.current) {
      const newPosition = Math.min(maxScroll, scrollPosition + 200);
      categoryContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    if (categoryContainerRef.current) {
      const updateMaxScroll = () => {
        const container = categoryContainerRef.current;
        setMaxScroll(container.scrollWidth - container.clientWidth);
      };

      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll);
      return () => window.removeEventListener("resize", updateMaxScroll);
    }
  }, []);

  return (
    <div className="container min-h-screen">
      <div className="left-layout">
        <div className="px-0 pt-[100px] sm:pt-[135px] pb-10">
          {/* 헤더 섹션 추가 */}
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <LuFileSearch className="text-4xl sm:text-6xl text-Main" />
            <h1 className="text-xl sm:text-2xl font-medium cursor-default">
              법률 서식
            </h1>
          </div>

          {/* 검색바 */}
          <div className="relative mb-6 sm:mb-8">
            <div className="relative w-full max-w-[900px]">
              <input
                type="text"
                placeholder="필요한 법률 서식을 검색하세요..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-lg border border-gray-300 rounded-xl shadow-sm 
                         focus:outline-none focus:border-Main focus:ring-1 focus:ring-[#d7d5cc] 
                          transition-colors duration-200
                          bg-gray-50/50 hover:bg-white"
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <button
                onClick={handleSearch}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 px-3 sm:px-5 py-1.5 sm:py-2 
                               text-xs sm:text-sm text-white bg-Main hover:bg-Main_hover 
                               rounded-lg transition-colors duration-200"
              >
                검색
              </button>
            </div>
          </div>

          {/* 카테고리 버튼 그룹 */}
          <div className="relative mb-6 sm:mb-10 w-full max-w-[900px]">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-2/3 bg-white/80 hover:bg-white p-1 rounded-full shadow-md sm:hidden "
              >
                <IoIosArrowBack className="w-4 h-4 text-gray-600" />
              </button>
              <div
                ref={categoryContainerRef}
                className="flex-1 overflow-x-auto scrollbar-hide sm:overflow-visible "
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-1.5 sm:gap-2 whitespace-nowrap sm:flex-wrap sm:whitespace-normal">
                  {Object.entries(categoryMapping).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleCategoryClick(key)}
                      className={`px-2 sm:px-3 py-1.5 border rounded-lg transition-colors duration-200
                        min-w-fit sm:min-w-[100px] text-center text-xs sm:text-sm
                        whitespace-nowrap
                        ${
                          selectedCategory === key
                            ? "bg-Main text-white border-Main"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-2/3 bg-white/80 hover:bg-white p-1 rounded-full shadow-md sm:hidden"
              >
                <IoIosArrowForward className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* DocumentSection에 searchQuery 전달 */}
          <DocumentSection
            documents={getDisplayDocuments()}
            categoryMapping={categoryMapping}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            setSelectedFile={setSelectedFile}
            setPreviewUrl={setPreviewUrl}
            searchTrigger={searchTrigger}
            setSearchTrigger={setSearchTrigger}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      {/* 미리보기 모달 */}
      {selectedFile && (
        <PreviewModal
          file={selectedFile}
          previewUrl={previewUrl}
          onClose={handleClosePreview}
        />
      )}
      <div className="right-layout">{/* 빈 공간으로 남겨둠 */}</div>
    </div>
  );
};

export default Template;
