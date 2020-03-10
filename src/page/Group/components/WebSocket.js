import React, {useState, useEffect} from 'react';
import SockJsClient from 'react-stomp';
import {Message} from "react-chat-ui";

// /ws/sendToServer 客户端 to 服务端
// /ws/sendToPublic 发送消息到订阅public频道的用户
// /ws/sendToSomeone 发送到指定用户
// const sendMsg = (msg) => {
//     clientRef.sendMessage(url, message)
// }

export default function WebSocket(
    {
        active,
        setActive,
        notice,
        setClient,
        setState,
        messages,
        setMessages
    }
) {

    return (
        <SockJsClient
            url={localStorage.getItem('server_config') + 'ws'}
            topics={[
                '/user/queue/msg',
                '/topic/test'
            ]}
            onConnect={() => {
                notice('Connected.', 0);
                setState(true);
            }}
            onDisconnect={() => {
                notice('Disconnect.', 0);
                setState(false);
            }}
            onMessage={(msg) => {
                let msgs = msg.split('||');
                messages.push(new Message({
                    id: Math.random() * 100000,
                    message: msgs[1],
                    senderName: msgs[0]
                }))
                setMessages(messages);
                setActive(!active);
            }}
            ref={(client) => {
                setClient(client);
            }}
        />
    );
}