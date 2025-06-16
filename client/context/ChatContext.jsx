import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = ([]);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, axios } = useContext(AuthContext);

    //function to get all user for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // function to get messages for selected users
    const getMessage = async (userId) => {
        try{
            const {data} = axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    //function to send msg to selected user
    const sendMessage = async (messageData) => {
        try{
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}` , messageData);
            if(data.success){
                setMessages((prevmsg) => [...prevmsg, data.newMessage])
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // function to subscribe to msg for selected user
    const subsToMsg = async() => {
        if(!socket) return;
        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true
                setMessages((prevmsg) => [...prevmsg, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevunseenMsg) => ({
                    ...prevunseenMsg, [newMessage.senderId] : prevunseenMsg[newMessage.senderId] ? prevunseenMsg[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    // function to unsubscribe from messages
    const unsebsMsg = async () => {
        if(socket) socket.off("newMessage");
    }

    useEffect(() => {
        subsToMsg();
        return () => unsebsMsg();
    }, [socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        getMessage,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
        
    }

    return (<ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>)
}