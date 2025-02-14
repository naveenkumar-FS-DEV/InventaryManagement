import { Table, Button, Modal, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

const IMTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Product>({
    _id: "",
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    description: "",
  });

  const showModal = (product: Product) => {
    setUpdateData({...product});
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v3/products/"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/v3/products/${_id}`);
      toast.success("Product deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete product");
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v3/products/${updateData._id}`,
        updateData
      );
      toast.success("Product updated successfully");
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update product");
      console.log(error);
    }
  };
  

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Update",
      key: "description",
      render: (record: Product) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() =>showModal(record)}
        >
          Update
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "description",
      render: (record: Product) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Toaster />
      <div className="container">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
        />
      </div>
      <div>
        <Modal
          title="Update Data"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <form className="formUpdate-container">
            <Input
              placeholder="Name"
              value={updateData.name}
              onChange={(e) =>
                setUpdateData({ ...updateData, name: e.target.value })
              }
            />
            <Input
              placeholder="Category"
              value={updateData.category}
              onChange={(e) =>
                setUpdateData({ ...updateData, category: e.target.value })
              }
            />
            <Input
              placeholder="Quantity"
              value={updateData.quantity}
              onChange={(e) =>
                setUpdateData({ ...updateData, quantity: Number(e.target.value) })
              }
            />
            <Input
              placeholder="Price"
              value={updateData.price}
              onChange={(e) =>
                setUpdateData({ ...updateData, price: Number(e.target.value) })
              }
            />
            <Input
              placeholder="Description"
              value={updateData.description}
              onChange={(e) =>
                setUpdateData({ ...updateData, description: e.target.value })
              }
            />
            <Button className="submit-btn" onClick={handleUpdate}>
              Update
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default IMTable;
