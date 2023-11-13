import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface BoardItem {
  BOARD_ID: number;
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
  REGISTER_DATE: string;
}

const Board: React.FC<{
  id: number;
  title: string;
  content: string;
  registerId: string;
  registerDate: string;
}> = ({ id, title, content, registerId, registerDate }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>
        <Link
          to={`/read/${id}`}
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "normal",
            display: "block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.fontWeight = "bold"; // 마우스가 올라갈 때 굵은 글씨로 변경
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.fontWeight = "normal"; // 마우스가 벗어날 때 기본 글씨로 변경
          }}
        >
          {title}
        </Link>
      </td>
      <td>{content}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

const BoardList: React.FC = () => {
  // 게시판 목록을 담는 상태
  const [boardList, setBoardList] = useState<BoardItem[]>([]);

  // 게시판 목록을 서버로부터 받아오는 함수
  const getList = useCallback(() => {
    Axios.get<BoardItem[]>("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        setBoardList(data);
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const style1: React.CSSProperties = {
    textAlign: "center",
    marginTop: "50px",
    fontWeight: "700",
  };

  const style2: React.CSSProperties = {
    textAlign: "left",
    fontSize: "13px",
  };

  return (
    <div>
      <h3 style={style1}>문의 게시판</h3>
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Table striped bordered hover style={style2}>
          <colgroup>
            <col style={{ width: "5%" }}></col>
            <col style={{ width: "20%" }}></col>
            <col style={{ width: "63%" }}></col>
            <col style={{ width: "5%" }}></col>
            <col style={{ width: "7%" }}></col>
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((v) => (
              <Board
                id={v.BOARD_ID}
                title={v.BOARD_TITLE}
                content={v.BOARD_CONTENT}
                registerId={v.REGISTER_ID}
                registerDate={v.REGISTER_DATE}
                key={v.BOARD_ID}
              />
            ))}
          </tbody>
        </Table>
        <div style={{ float: "right" }}>
          <Link to="/write">
            <Button variant="outline-secondary">글쓰기</Button>
          </Link>
          {""}
        </div>
      </Container>
    </div>
  );
};

export default BoardList;
