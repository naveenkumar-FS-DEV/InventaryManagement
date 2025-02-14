import { useState } from "react";
import { Button, Modal, Input } from "antd";
import axios from "axios";
import { LogoutOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import {Link} from "react-router-dom"

interface ProductData {
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

const CreateData = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [createData, setCreateData] = useState<ProductData>({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    description: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      await axios.post("http://localhost:8080/api/v3/products/", createData);
      toast.success("Product successfully created");
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to create product!");
      console.log(error);
    }
  };

  return (
    <div className="createData-container">
      <Toaster />
      <Button type="primary" className="modal-btn" onClick={showModal}>
        Create Data
      </Button>
      <Link to="/">
      <Button style={{ backgroundColor:  'black', color: 'white'}}><LogoutOutlined />Logout </Button>
      </Link>
      <Modal
        title="Create Data"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="form-container">
          <Input
            placeholder="Name"
            value={createData.name}
            onChange={(e) =>
              setCreateData({ ...createData, name: e.target.value })
            }
          />
          <Input
            placeholder="Category"
            value={createData.category}
            onChange={(e) =>
              setCreateData({ ...createData, category: e.target.value })
            }
          />
          <Input
            placeholder="Quantity"
            value={createData.quantity}
            onChange={(e) =>
              setCreateData({ ...createData, quantity: Number(e.target.value) })
            }
          />
          <Input
            placeholder="Price"
            value={createData.price}
            onChange={(e) =>
              setCreateData({ ...createData, price: Number(e.target.value) })
            }
          />
          <Input
            placeholder="Description"
            value={createData.description}
            onChange={(e) =>
              setCreateData({ ...createData, description: e.target.value })
            }
          />
          <Button className="submit-btn" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateData;
