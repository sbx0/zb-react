import React, {useState, useEffect} from 'react';
import "../../i18N"
import {fetchGet, fetchPost, fetchStatus, fetchStatusAlert} from "../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation, useParams} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Badge, Card, CardContent, CardHeader, Divider, LinearProgress} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import WebSocket from "../Group/components/WebSocket";
import {ChatFeed, Message} from "react-chat-ui";
import TextField from "@material-ui/core/TextField";

export default function ChatPage({user, notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    let {id} = useParams();
    const [messages, setMessages] = useState([
        new Message({
            id: 0,
            message: '这里是公共聊天室，你的发言将会实时推送给所有人，但聊天记录不会保存在服务器上。发言前请务必遵守当地的法律法规，本站有权收回您的账号。聊天愉快！',
            senderName: '系统提示'
        }),
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [values, setValues] = useState({
        id: '',
        msg: 'Hi.',
    });
    const [client, setClient] = useState(null);

    const [url, setUrl] = useState('/ws/send/channel');
    const [active, setActive] = useState(false);
    const [state, setState] = useState(false);

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    function sendMsg() {
        if (client != null && state) {
            client.sendMessage(url, user.name + '||test||' + values.msg);
        }
    }

    useEffect(() => {
        console.log(messages);
    }, [active]);

    return <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={"inherit"}>实时公共聊天室</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <WebSocket
                        setActive={setActive}
                        active={active}
                        setState={setState}
                        setClient={setClient}
                        setMessages={setMessages}
                        messages={messages}
                        notice={notice}
                    />
                    <ChatFeed
                        messages={messages}
                        isTyping={isTyping}
                        hasInputField={false}
                        showSenderName
                        bubblesCentered={false}
                        maxHeight={500}
                        bubbleStyles={
                            {
                                text: {
                                    color: 'black',
                                    fontSize: 15
                                },
                                chatbubble: {
                                    borderRadius: 10,
                                    padding: 10
                                }
                            }
                        }
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={t("消息")}
                        value={values.msg}
                        onChange={handleChange('msg')}
                        variant="outlined"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.divider}
                        onClick={() => {
                            sendMsg();
                            setValues({...values, msg: ''});
                        }}
                    >
                        发送
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </>;
}

const useStyles = makeStyles(theme => ({
    center: {
        textAlign: 'center'
    },
    divider: {
        margin: '10px auto'
    }
}));