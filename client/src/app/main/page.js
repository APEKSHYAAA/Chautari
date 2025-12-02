    'use client'
    import React, { useEffect, useState, useRef, useCallback } from 'react'
    import Navbar from '../../components/navbar/page'
    import Page from'../../app/userList/page'
    import { useSelector , useDispatch} from 'react-redux';
    import { Avatar } from "@nextui-org/react";
    import {io} from 'socket.io-client';

    const socketRef = { current: null };


    const Main = () => {
        const [chats, setChats] = useState({}) // { userId: { user: userObject, messages: [messages] } }
        const inputref = useRef()
        const [searchQuery, setSearchQuery] = useState('')
        const [selectedUser, setSelectedUser] = useState(null)
        const [showSearch, setShowSearch] = useState(false);
        const { userDetails } = useSelector(state => state.user);

        useEffect(() => {
            const handleClickOutside = (event) => {
            if (event.target.id !== 'search') {
                setShowSearch(false);
            }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            }
        }, []);


        
        const sendChat = () => {
            if (inputref.current.value.trim() && selectedUser) {
                const newMessage = inputref.current.value;
                socketRef.current.emit('send message', {
    receiverId: selectedUser.id,
    senderId: userDetails._id,
    msg: newMessage
});

                const updatedChats = {
                    ...chats,
                    [selectedUser.id]: {
                        user: selectedUser,
                        messages: [...(chats[selectedUser.id]?.messages || []), newMessage]
                    }
                };
                setChats(updatedChats);
                inputref.current.value = '';
            }
        }

        const handleSearchChange = (e) => {
            setSearchQuery(e.target.value);
        }

        const handleUserSelect = useCallback((user) => {
            console.log("Main: handleUserSelect called with user:", user);
            setSelectedUser(user);
            setShowSearch(false);
            setSearchQuery('');
        }, []);

        const getChattedUsers = () =>
        Object.values(chats)
        .filter(chat => chat?.user)   // remove broken chat objects
        .map(chat => chat.user);


        useEffect(() => {
    if (!socketRef.current) {
        socketRef.current = io("http://localhost:8000");
    }

    const socket = socketRef.current;

    socket.on("connect", () => {
        console.log("Connected with:", socket.id);
        socket.emit("add user", userDetails._id);
    });

    const handleReceiveMessage = ({ senderId, msg }) => {
        console.log("Message from:", senderId, msg);

        setChats(prev => ({
            ...prev,
            [senderId]: {
                user: prev[senderId]?.user || { id: senderId },
                messages: [...(prev[senderId]?.messages || []), msg]
            }
        }));
    };

    socket.on("receive message", handleReceiveMessage);

    return () => {
        socket.off("receive message", handleReceiveMessage);
    };
}, [userDetails._id]);

        return(
        <>
            <Navbar/>  
            <div className="flex fixed top-[7.5vh] left-0 w-screen h-screen space-x-4 ">
                {/* Friends Sidebar */}
                <div className="w-full max-w-[350px] border-small px-1 py-2 rounded-medium border-gray-300 dark:border-default-100 lg:block">
                    <div className="form-control">
                        <input 
                            id="search" 
                            type="text" 
                            placeholder="Search Friends" 
                            className="input input-bordered w-24 md:w-auto lg:block" 
                            onClick={() => setShowSearch(true)}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {showSearch && (
                            <div className="absolute top-[6.5vh] left-0 z-10 bg-white w-[355px] h-[93vh] lg:block ">
                                <Page searchQuery={searchQuery} onUserSelect={handleUserSelect} />
                            </div>
                        )}
                    </div>
                    
                    {/* Recent Chats Section - Below Search */}
                    <div className="mt-4">
                        <h3 className="text-gray-700 font-semibold mb-3 px-2">Recent Chats</h3>
                        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                            {getChattedUsers().length > 0 ? (
                                getChattedUsers().map(user => (
                                    <div 
                                        key={user.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                            selectedUser?.id === user.id 
                                                ? 'bg-pink-100 border-l-4 border-gray-400' 
                                                : 'hover:bg-pink-50'
                                        }`}
                                        onClick={() => handleUserSelect(user)}
                                    >
                                        <Avatar 
                                            alt={`${user.firstName} ${user.lastName}`}
                                            size="sm" 
                                            src={user.avatar}
                                            className="border-2 border-gray-200"
                                        />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-medium font-semibold text-gray-800 truncate">
                                                {user.firstName} {user.lastName}
                                            </span>
                                            <span className="text-small text-gray-500 truncate">
                                                {chats[user.id]?.messages?.[chats[user.id].messages.length - 1] || 'New conversation'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    No recent chats
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-full h-[93vh] border border-gray-300 rounded-lg flex flex-col justify-between sm:w-screen">
                    {/* Selected User Info - Gray Header */}
                    <div className="border-b border-gray-200 p-4 bg-pink-50">
                        {selectedUser ? (
                            <div className="flex items-center gap-3">
                                <Avatar 
                                    alt={selectedUser.name || `${selectedUser.firstName} ${selectedUser.lastName}`} 
                                    size="md" 
                                    src={selectedUser.avatar}
                                    className="border-2 border-gray-400"
                                />
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold text-gray-800">
                                        {selectedUser.firstName} {selectedUser.lastName}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-600 text-lg font-semibold">
                                Select a user to start chatting
                            </div>
                        )}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-auto p-4 bg-pink-25">
                        {selectedUser && chats[selectedUser.id]?.messages?.length > 0 ? (
                            <div className="space-y-4">
                                {chats[selectedUser.id].messages.map((message, index) => (
                                    <div key={index} className="flex justify-end">
                                        <div className="bg-pink-600 text-white rounded-lg p-3 max-w-xs shadow-lg">
                                            {message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                {selectedUser 
                                    ? `Send your first message to ${selectedUser.firstName}`
                                    : 'Select a user from the list to start chatting'
                                }
                            </div>
                        )}
                    </div>     
                    
                    {/* Message Input */}
                    <div className="flex p-4 border-t border-gray-200 bg-white">
                        <input 
                            className="flex-grow rounded-lg border p-2 mr-4 input input-bordered border-gray-300 focus:border-gray-500 text-gray-700 placeholder-gray-400" 
                            type="text" 
                            ref={inputref} 
                            placeholder={selectedUser ? `Message ${selectedUser.firstName}` : "Select a user to chat"} 
                            disabled={!selectedUser}
                            onKeyPress={(e) => e.key === 'Enter' && sendChat()}
                        />
                        <button 
                            className="rounded-lg bg-pink-600 text-white border border-gray-600 p-2 hover:bg-pink-700 disabled:bg-pink-400 disabled:border-gray-400 transition-colors duration-200 font-semibold"
                            onClick={sendChat}
                            disabled={!selectedUser}
                        >
                            Send
                        </button>        
                    </div>
                </div>
            </div>
        </>
        )
    }

    export default Main;