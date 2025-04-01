import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// 서버 주소에 맞게 변경
const socket = io("http://localhost:8000");

const Chat = () => {

    // redux에서 나 가져오기
    const { email } = useSelector((state) => state.user.curruentUser)
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(email);
    const [toUserId, setToUserId] = useState("");  // 1:1 채팅 상대

    useEffect(() => {
        // 브라우저가 열릴 때 저장된 userId 가져오기
        if (email) {
            setUserId(email);
            socket.emit("register", email);  // 서버에 사용자 등록
        }

        // 서버에서 모든 사용자에게 온 메시지를 받음
        socket.on("receiveMessage", (receivedMessage) => {
            setMessages((prev) => [...prev, `모든 사용자: ${receivedMessage}`]);
        });

        // 1:1 메시지 받기
        socket.on("receivePrivateMessage", (receivedMessage) => {
            setMessages((prev) => [...prev, `1:1: ${receivedMessage}`]);
        });

        // Cleanup
        return () => {
            socket.off("receiveMessage");
            socket.off("receivePrivateMessage");
        };
    }, []);  // 빈 배열로 useEffect가 한 번만 실행되도록 설정

    // 모든 사용자에게 메시지 전송
    const handleSendMessage = () => {
        socket.emit("sendMessage", message);  // 서버로 메시지 전송
        setMessages((prev) => [...prev, `나: ${message}`]);
        setMessage("");  // 입력 필드 초기화
    };

    // 1:1 메시지 전송
    const handleSendPrivateMessage = () => {
        socket.emit("sendPrivateMessage", { toUserId, message });
        setMessages((prev) => [...prev, `나 (1:1): ${message}`]);
        setMessage("");  // 입력 필드 초기화
    };

    return (
        <div>
            <div>
                <h3>1:1 채팅</h3>
                <input
                    type="text"
                    value={toUserId}
                    onChange={(e) => setToUserId(e.target.value)}
                    placeholder="상대 사용자 ID"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지 입력"
                />
                <button onClick={handleSendPrivateMessage}>1:1 메시지 보내기</button>
            </div>
            <div>
                <button onClick={handleSendMessage}>모든 사용자에게 보내기</button>
            </div>

            <div>
                <h3>채팅 목록</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
