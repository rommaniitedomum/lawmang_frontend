import { useState, useRef, useEffect } from "react";
import { useSubmitTaxResearchMutation } from "../../redux/slices/deepResearchApi";
import { pdfStyles } from "./pdfStyle";
import { generateTaxPDF } from "./pdfGenerator";

const TaxResearchForm = ({ setIsLoading }) => {
  const [formData, setFormData] = useState({
    report_type: "",
    report_period: "",
    income_type: "",
    concern: "",
    desired_result: "",
    additional_info: "",
  });

  const [submitTaxResearch, { isLoading }] = useSubmitTaxResearchMutation();
  const [result, setResult] = useState(null);
  const reportRef = useRef(null);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitTaxResearch(formData).unwrap();
      setResult(response);
    } catch (error) {
      console.error("Error:", error);
      alert("보고서 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .loading-icon {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              신고 유형
            </label>
            <input
              type="text"
              value={formData.report_type}
              onChange={(e) =>
                setFormData({ ...formData, report_type: e.target.value })
              }
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main placeholder:text-sm md:placeholder:text-base bg-gray-50/50 hover:bg-white"
              placeholder="예: 종합소득세, 부가가치세 등"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              신고 대상 기간
            </label>
            <input
              type="text"
              value={formData.report_period}
              onChange={(e) =>
                setFormData({ ...formData, report_period: e.target.value })
              }
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main placeholder:text-sm md:placeholder:text-base bg-gray-50/50 hover:bg-white"
              placeholder="예: 2023년 귀속, 2024년 1기 등"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              소득/사업 유형
            </label>
            <input
              type="text"
              value={formData.income_type}
              onChange={(e) =>
                setFormData({ ...formData, income_type: e.target.value })
              }
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main placeholder:text-sm md:placeholder:text-base bg-gray-50/50 hover:bg-white"
              placeholder="예: 프리랜서, 개인사업자 등"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              걱정되는 점
            </label>
            <textarea
              value={formData.concern}
              onChange={(e) =>
                setFormData({ ...formData, concern: e.target.value })
              }
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main h-24 md:h-32 resize-none placeholder:text-sm md:placeholder:text-base bg-gray-50/50 hover:bg-white"
              placeholder="세무 신고시 우려되는 사항을 설명해주세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              원하는 신고 목표
            </label>
            <input
              type="text"
              value={formData.desired_result}
              onChange={(e) =>
                setFormData({ ...formData, desired_result: e.target.value })
              }
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main placeholder:text-sm md:placeholder:text-base bg-gray-50/50 hover:bg-white"
              placeholder="예: 적절한 공제 적용, 세금 최적화 등"
              required
            />
          </div>

          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-1 md:mb-2">
              추가 참고 사항
            </label>
            <textarea
              value={formData.additional_info}
              onChange={(e) =>
                setFormData({ ...formData, additional_info: e.target.value })
              }
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main h-24 md:h-32 resize-none placeholder:text-sm md:placeholder:text-base bg-gray-50/50 hover:bg-white"
              placeholder="기타 참고할 만한 사항을 자유롭게 작성해주세요"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 md:p-4 text-white rounded-lg transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-Main hover:bg-Main_hover"
              }`}
            >
              {isLoading ? "분석 중..." : "세무 검토 요청"}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
              {isLoading ? (
                <>
                  <p className="text-xs md:text-sm text-gray-500">
                    약 1~2분 정도의 시간이 소요될 수 있습니다.
                  </p>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-Main loading-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </>
              ) : result ? (
                <>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">
                    작성이 완료되었습니다! 아래의 내용을 확인해주세요.
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>

      {result && (
        <div className="w-[95%] sm:w-full max-w-4xl mx-auto bg-gray-50 rounded-lg p-4 sm:p-8 shadow-lg">
          <div
            ref={reportRef}
            className="sm:bg-white sm:p-8 sm:rounded-lg"
            style={{
              ...pdfStyles.container,
              margin: 0,
              padding: 0,
              backgroundColor: "transparent",
              maxWidth: "none",
            }}
          >
            {/* 제목 + 버튼 */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-2">
              <h2 className="text-md sm:text-2xl font-bold text-center sm:text-left w-full sm:w-auto">
                📄 세무 검토 보고서
              </h2>
              <button
                onClick={() => generateTaxPDF(formData, result)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2 bg-Main text-white rounded-lg pdf-download-btn text-sm sm:text-base"
              >
                PDF 다운로드
              </button>
            </div>

            {/* 정보란 */}
            <div
              className="text-xs sm:text-sm"
              style={{
                lineHeight: "1.6",
                marginBottom: "12px",
              }}
            >
              <p>작성일시: {result.timestamp}</p>
              <p>신고유형: {formData.report_type}</p>
              <p>신고기간: {formData.report_period}</p>
              <p>소득/사업유형: {formData.income_type}</p>
            </div>

            <hr className="my-3 sm:my-4 border-gray-300" />

            {/* 본문 */}
            <div
              className="text-sm sm:text-base"
              style={{
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {result.final_report
                .replace(/^#+\s/gm, "")
                .split("\n")
                .map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxResearchForm;
