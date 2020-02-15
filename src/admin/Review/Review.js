import React, {useState, forwardRef, useEffect, createRef} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import MaterialTable from "material-table";

import {makeStyles} from '@material-ui/core/styles';
import {useMediaQuery, useTheme} from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../tools/Network";
import ReactMarkdown from "react-markdown";
import Container from "@material-ui/core/Container";
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


function Review({notice, setLoading}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const tableRef = createRef();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div className={classes.container}>
            <MaterialTable
                icons={tableIcons}
                tableRef={tableRef}
                columns={[
                    {title: t("用户认证表.id"), field: "id"},
                    {title: t("用户认证表.userId"), field: "userId"},
                    {title: t("用户认证表.status"), field: "status"},
                    {title: t("用户认证表.kind"), field: "kind", type: "numeric"},
                    {title: t("用户认证表.material"), field: "material", render: rowData => rowData.material.substr(0, 5)},
                    {title: t("用户认证表.validityTime"), field: "validityTime"},
                    {title: t("用户认证表.submitTime"), field: "submitTime"},
                ]}
                localization={{
                    header: {
                        actions: t("操作")
                    },
                    toolbar: {
                        searchTooltip: t("搜索"),
                        searchPlaceholder: t("搜索"),
                    },
                    pagination: {
                        labelRowsSelect: t("行"),
                        firstAriaLabel: t("首页"),
                        firstTooltip: t("首页"),
                        previousAriaLabel: t("上一页"),
                        previousTooltip: t("上一页"),
                        nextAriaLabel: t("下一页"),
                        nextTooltip: t("下一页"),
                        lastAriaLabel: t("末页"),
                        lastTooltip: t("末页"),
                        labelDisplayedRows: '{from}-{to} / {count}',
                    },
                }}
                data={query =>
                    new Promise((resolve, reject) => {
                        let url = 'user/certification/list?status=0';
                        url += '&page=' + (query.page + 1)
                        url += '&size=' + query.pageSize
                        fetchGet(
                            url
                        ).then((json) => {
                            const status = json['status'];
                            const data = json['objects'];
                            if (fetchStatus(status)) {
                                if (data != null && data.length > 0)
                                    resolve({
                                        data: data,
                                        page: json['page'] - 1,
                                        totalCount: json['total'],
                                    });
                                else
                                    resolve({
                                        data: [],
                                        page: query.page,
                                        totalCount: 0,
                                    });
                            } else {
                                notice(t(fetchStatusAlert(status)), status);
                            }
                        }).catch((error) => {
                            notice(error.toString(), -1);
                        });
                    })
                }
                title={t("认证审核")}
                actions={[
                    {
                        icon: () => <Check/>,
                        tooltip: t("通过"),
                        onClick: (event, rowData) => {
                            console.log(rowData)
                            let url = 'user/certification/judge?id=' + rowData.id + "&status=1";
                            fetchGet(
                                url
                            ).then((json) => {
                                const status = json['status'];
                                notice(t(fetchStatusAlert(status)), status);
                                tableRef.current && tableRef.current.onQueryChange()
                            }).catch((error) => {
                                notice(error.toString(), -1);
                            });
                        }
                    },
                    {
                        icon: () => <CloseIcon/>,
                        tooltip: t("驳回"),
                        onClick: (event, rowData) => {
                            console.log(rowData)
                            let url = 'user/certification/judge?id=' + rowData.id + "&status=-1";
                            fetchGet(
                                url
                            ).then((json) => {
                                const status = json['status'];
                                notice(t(fetchStatusAlert(status)), status);
                                tableRef.current && tableRef.current.onQueryChange()
                            }).catch((error) => {
                                notice(error.toString(), -1);
                            });
                        }
                    },
                    {
                        icon: () => <RefreshIcon/>,
                        tooltip: t("刷新"),
                        isFreeAction: true,
                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                    }
                ]}
                detailPanel={[
                    {
                        tooltip: t("查看材料"),
                        render: rowData => {
                            return (
                                <Container>
                                    <ReactMarkdown
                                        source={rowData.material}
                                        escapeHtml={false}
                                    />
                                </Container>
                            )
                        },
                    },
                ]}
            />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px auto',
    },
    center: {
        margin: '0px auto',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default Review;
