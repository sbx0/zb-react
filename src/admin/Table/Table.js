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
import {fetchGet, fetchPost, fetchStatus, fetchStatusAlert} from "../../tools/Network";
import ReactMarkdown from "react-markdown";
import Container from "@material-ui/core/Container";
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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


function Table({notice, setLoading}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const tableRef = createRef();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const [openSidebar, setOpenSidebar] = useState(false);
    const [columns, setColumns] = useState([]);
    const [table, setTable] = useState('statistical_user');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    const table_columns_data = {
        user_role: {
            name: t("角色表"),
            url: 'user/role/admin/'
        },
        user_role_bind: {
            name: t("角色绑定表"),
            url: 'user/role/bind/admin/'
        },
        user_base: {
            name: t("基础用户表"),
            url: 'user/base/admin/'
        },
        user_info: {
            name: t("用户信息表"),
            url: 'user/info/admin/'
        },
        user_certification: {
            name: t("用户认证表"),
            url: 'user/certification/admin/'
        },
        statistical_data: {
            name: t("数据统计表"),
            url: 'statistical/data/admin/'
        },
        statistical_user: {
            name: t("用户统计表"),
            url: 'statistical/user/admin/'
        },
        option: {
            add: 'save',
            delete: 'delete',
            show: 'one',
            update: 'save',
            list: 'list',
            attribute: 'attribute',
        }
    };

    useEffect(() => {
        buildColumns();
        tableRef.current && tableRef.current.onQueryChange();
    }, [table])

    function buildColumns() {
        let url = table_columns_data[table].url + table_columns_data.option.attribute;
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const data = json['objects'];
                let column = [];
                for (let i = 0; i < data.length; i++) {
                    let temp = {
                        title: '',
                        field: '',
                    };
                    temp.title = data[i]['name'];
                    temp.field = data[i]['name'];
                    column.push(temp);
                }
                setColumns(column);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }

    const handleChange = event => {
        setTable(event.target.value);
    };

    return (
        <div className={classes.container}>
            <Select value={table} onChange={handleChange}>
                <MenuItem value="user_role">角色表</MenuItem>
                <MenuItem value="user_role_bind">角色绑定表</MenuItem>
                <MenuItem value="user_base">基础用户表</MenuItem>
                <MenuItem value="user_info">用户信息表</MenuItem>
                <MenuItem value="user_certification">用户认证表</MenuItem>
                <MenuItem value="statistical_data">数据统计表</MenuItem>
                <MenuItem value="statistical_user">用户统计表</MenuItem>
            </Select>
            <MaterialTable
                icons={tableIcons}
                tableRef={tableRef}
                columns={columns}
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
                data={query => new Promise((resolve, reject) => {
                    let url = table_columns_data[table].url + 'list';
                    url += '?page=' + (query.page + 1);
                    url += '&size=' + query.pageSize;
                    fetchGet(
                        url
                    ).then((json) => {
                        const status = json['status'];
                        const data = json['objects'];
                        if (fetchStatus(status)) {
                            resolve({
                                data: data,
                                page: json['page'] - 1,
                                totalCount: json['total_elements'],
                            });
                        } else {
                            notice(t(fetchStatusAlert(status)), status);
                        }
                    }).catch((error) => {
                        notice(error.toString(), -1);
                    });
                })
                }
                title={table}
                editable={{
                    onRowAdd: newData => new Promise(resolve => {
                        console.log(newData);
                        fetchPost(table_columns_data[table].url + 'save', newData).then((json) => {
                            setLoading(false);
                            const status = json['status'];
                            notice(t(fetchStatusAlert(status)), status);
                        }).catch((error) => {
                            notice(error.toString(), -1);
                            setLoading(false);
                        });
                        resolve();
                    }),
                    onRowUpdate: (newData, oldData) => new Promise(resolve => {
                        console.log(newData)
                        console.log(oldData)
                        fetchPost(table_columns_data[table].url + 'save', newData).then((json) => {
                            setLoading(false);
                            const status = json['status'];
                            notice(t(fetchStatusAlert(status)), status);
                        }).catch((error) => {
                            notice(error.toString(), -1);
                            setLoading(false);
                        });
                        resolve();
                    }),
                    onRowDelete: oldData => new Promise(resolve => {
                        console.log(oldData)
                        let url = table_columns_data[table].url + 'delete?id=' + oldData["id"];
                        fetchGet(
                            url
                        ).then((json) => {
                            const status = json['status'];
                            notice(t(fetchStatusAlert(status)), status);
                        }).catch((error) => {
                            notice(error.toString(), -1);
                        });
                        resolve();
                    }),
                }}
                actions={[
                    {
                        icon: () => <RefreshIcon/>,
                        tooltip: t("刷新"),
                        isFreeAction: true,
                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                    }
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

export default Table;
