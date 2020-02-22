import React, {useState, useEffect, useRef} from 'react';
import "../../../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
    Badge,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import ShowUser from "../../../../Components/ShowUser";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import {ChatFeed, Message} from 'react-chat-ui'
import GroupList from "../List/List";

export default function RecentActivity({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [activities, setActivities] = useState([
        new Message({
            id: 2,
            message: "平板测试 加入了。",
            senderName: '系统消息'
        }),
        new Message({
            id: 1,
            message: "以下是胡扯 创建该组。",
            senderName: '系统消息'
        }),
    ]);
    const [isTyping, setIsTyping] = useState(false);

    return <>
        <div className={classes.paper}>
            <Card>
                <CardHeader
                    title={t("活动")}
                />
                <CardContent>
                    <ChatFeed
                        messages={activities} // Boolean: list of message objects
                        isTyping={isTyping} // Boolean: is the recipient typing
                        hasInputField={false} // Boolean: use our input, or use your own
                        showSenderName // show the name of the user who sent the message
                        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                        // JSON: Custom bubble styles
                        bubbleStyles={
                            {
                                text: {
                                    fontSize: 11
                                },
                                chatbubble: {
                                    borderRadius: 70,
                                    padding: 4
                                }
                            }
                        }
                    />
                </CardContent>
            </Card>
        </div>
    </>;
}

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
    paper: {
        alignItems: 'center',
    },
    divider: {
        margin: '10px auto'
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
}));