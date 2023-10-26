// import PropTypes from "prop-types";
import { Form, Input, Modal, Popconfirm, Typography } from "antd";

import * as St from "./SubjectTable.styled";
import { useEffect, useState } from "react";
import instance from "@/utils/instance";
import toast, { Toaster } from "react-hot-toast";

const SubjectTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAdd = () => {
        setModalVisible(true);
    };

    const fetchData = () => {
        instance
            .get("subjects")
            .then((res) => {
                const formattedData = res.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                }));
                setData(formattedData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e) => {
        instance
            .delete("subjects", { data: { id: e.id } })
            .then(() => {
                toast.success("Successfully deleted!");
                fetchData();
            })
            .catch((error) => {
                toast.error("Error deleted!");
                console.log(error);
            });
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;
                instance
                    .post("subjects", { startTime, endTime })
                    .then(() => {
                        toast.success("Successfully created!");
                        form.resetFields();
                        setModalVisible(false);
                        fetchData();
                    })
                    .catch((error) => {
                        toast.error("This is an error!");
                        console.log(error);
                    });
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <div>{record.id}</div>;
            },
        },
        {
            title: "Subject Name",
            width: "25%",
            render: (record) => {
                return <div>{record.name}</div>;
            },
        },
        {
            title: "Subject Code",
            width: "25%",
            render: (record) => {
                return <div>{record.code}</div>;
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                if (record.status === 1) {
                    return <div>Active</div>;
                } else {
                    return <div>Close</div>;
                }
            },
        },
        {
            title: "Operation",
            width: "25%",
            render: (record) => {
                return (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Typography.Link>Delete</Typography.Link>
                    </Popconfirm>
                );
            },
        },
    ];

    return (
        <St.DivTable>
            <Toaster position="top-right" reverseOrder={false} />
            <St.ButtonTable
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a row
            </St.ButtonTable>

            <Modal
                title="Add a row"
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="add_row_form">
                    <Form.Item
                        name="semester"
                        rules={[
                            {
                                required: true,
                                message: "Please input the semester!",
                            },
                        ]}
                    >
                        <Input placeholder="Semester" />
                    </Form.Item>
                    <Form.Item
                        name="subjectName"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject name!",
                            },
                        ]}
                    >
                        <Input placeholder="Subject Name" />
                    </Form.Item>
                    <Form.Item
                        name="subjectCode"
                        rules={[
                            {
                                required: true,
                                message: "Please input the subject code!",
                            },
                        ]}
                    >
                        <Input placeholder="Subject Code" />
                    </Form.Item>
                </Form>
            </Modal>
            <Form form={form} component={false}>
                <St.StyledTable
                    scroll={{ x: true }}
                    bordered
                    dataSource={data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 6,
                        hideOnSinglePage: data.length <= 6,
                        showSizeChanger: false,
                    }}
                    loading={loading}
                />
            </Form>
        </St.DivTable>
    );
};

SubjectTable.propTypes = {};

export default SubjectTable;
