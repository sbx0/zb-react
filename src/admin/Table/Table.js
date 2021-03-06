import React, {forwardRef, createRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import MaterialTable from "material-table";
import {makeStyles} from '@material-ui/core/styles';
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
import RefreshIcon from '@material-ui/icons/Refresh';
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";

import "../../i18N"
import {
    fetchStatus,
    fetchStatusAlert,
    getAdminDelete,
    getAdminList, getAttribute,
    postAdminSave
} from "../../tools/Network";

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

export default function Table({notice}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const tableRef = createRef();
    const [columns, setColumns] = useState([]);
    const [table, setTable] = useState('statistical_user');

    const table_columns_data = {
        user_role: {
            name: t("角色表"),
            url: 'user/role/'
        },
        user_role_bind: {
            name: t("角色绑定表"),
            url: 'user/role/bind/'
        },
        user_base: {
            name: t("基础用户表"),
            url: 'user/base/'
        },
        user_info: {
            name: t("用户信息表"),
            url: 'user/info/'
        },
        user_certification: {
            name: t("用户认证表"),
            url: 'user/certification/'
        },
        statistical_data: {
            name: t("数据统计表"),
            url: 'statistical/data/'
        },
        statistical_user: {
            name: t("用户统计表"),
            url: 'statistical/user/'
        },
        file_upload: {
            name: t("上传文件表"),
            url: 'file/upload/'
        },
        address_base: {
            name: t("基础地区表"),
            url: 'address/base/'
        },
        technical_achievements: {
            name: t("技术成果表"),
            url: 'technical/achievements/'
        },
        technical_classification: {
            name: t("技术分类表"),
            url: 'technical/classification/'
        },
        technical_requirements: {
            name: t("技术需求表"),
            url: 'technical/requirements/'
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
    }, [table]);

    function buildColumns() {
        getAttribute(
            table_columns_data[table].url, {}
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Select value={table} onChange={handleChange}>
                        <MenuItem value="user_role">角色表</MenuItem>
                        <MenuItem value="user_role_bind">角色绑定表</MenuItem>
                        <MenuItem value="user_base">基础用户表</MenuItem>
                        <MenuItem value="user_info">用户信息表</MenuItem>
                        <MenuItem value="user_certification">用户认证表</MenuItem>
                        <MenuItem value="statistical_data">数据统计表</MenuItem>
                        <MenuItem value="statistical_user">用户统计表</MenuItem>
                        <MenuItem value="file_upload">上传文件表</MenuItem>
                        <MenuItem value="address_base">基础地区表</MenuItem>
                        <MenuItem value="technical_achievements">技术成果表</MenuItem>
                        <MenuItem value="technical_classification">技术分类表</MenuItem>
                        <MenuItem value="technical_requirements">技术需求表</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
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
                            getAdminList(
                                table_columns_data[table].url,
                                {
                                    page: query.page + 1,
                                    size: query.pageSize,
                                }
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
                        })}
                        title={table}
                        editable={{
                            onRowAdd: newData => new Promise(resolve => {
                                postAdminSave(
                                    table_columns_data[table].url,
                                    newData
                                ).then((json) => {
                                    const status = json['status'];
                                    notice(t(fetchStatusAlert(status)), status);
                                    tableRef.current && tableRef.current.onQueryChange()
                                }).catch((error) => {
                                    notice(error.toString(), -1);
                                }).finally(() => {
                                    resolve();
                                });
                            }),
                            onRowUpdate: (newData, oldData) => new Promise(resolve => {
                                postAdminSave(
                                    table_columns_data[table].url,
                                    newData
                                ).then((json) => {
                                    const status = json['status'];
                                    notice(t(fetchStatusAlert(status)), status);
                                    tableRef.current && tableRef.current.onQueryChange()
                                }).catch((error) => {
                                    notice(error.toString(), -1);
                                }).finally(() => {
                                    resolve();
                                });
                            }),
                            onRowDelete: oldData => new Promise(resolve => {
                                getAdminDelete(
                                    table_columns_data[table].url,
                                    {id: oldData["id"],}
                                ).then((json) => {
                                    const status = json['status'];
                                    notice(t(fetchStatusAlert(status)), status);
                                    tableRef.current && tableRef.current.onQueryChange()
                                }).catch((error) => {
                                    notice(error.toString(), -1);
                                }).finally(() => {
                                    resolve();
                                });
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
                </Grid>
            </Grid>
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
