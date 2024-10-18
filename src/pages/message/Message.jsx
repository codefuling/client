import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import S from './style';

const Message = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [messages, setMessages] = useState([]);

  const currentUser = useSelector((state) => state.user.curruentUser);

  // WebSocket 연결 함수
  const connectWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket이 닫혔습니다. 재연결 시도 중...');
      setTimeout(connectWebSocket, 1000);  // 1초 후 재연결
    };

    ws.onerror = (error) => {
      console.error('WebSocket 에러:', error);
    };

    setSocket(ws);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    const to = fromUser; // 받는 사람의 이메일
    const from = currentUser.email; // 현재 사용자의 이메일
    
    // WebSocket이 연결된 상태인지 확인 후 메시지 전송
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ to, from, message }));
      setMessage('');
    } else {
      console.error("WebSocket이 연결되지 않았거나 닫힌 상태입니다.");
    }
  };

  const onchangeToUserEmail = (e) => {
    setFromUser(e.target.value);
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from.email}: </strong> {/* msg.from이 객체라면, email 필드 추출 */}
            <img src={msg.from.picture} alt="Profile" width="30" height="30" /> {/* msg.from.picture가 있다면 렌더링 */}
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className='messageWrap'>
        <div>
            <p>누구에게 보낼까요?</p>
            <input onChange={onchangeToUserEmail} type="text" />
        </div>
        <div>
            <p>메세지를 입력하세요.</p>
            <S.Message
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
