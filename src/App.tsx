import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardList from "./BoardList";
import Write from "./Write";
import Read from "./Read";
import Modify from "./Modify";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* "/" 경로에 대한 Route 설정. 게시글 목록 페이지 */}
          <Route path="/" element={<BoardList />} />

          {/* "/write" 경로에 대한 Route 설정. 게시글 작성 페이지 */}
          <Route path="/write" element={<Write />} />

          {/* "/read/:id" 경로에 대한 Route 설정. 게시글 읽기 페이지 */}
          <Route path="/read/:id" element={<Read />} />

          {/* "/modify/:id" 경로에 대한 Route 설정. 게시글 수정 페이지 */}
          <Route path="/modify/:id" element={<Modify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
