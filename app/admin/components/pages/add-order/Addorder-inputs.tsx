import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddOrderInputs = () => {
  const [count, setCount] = useState(0);
  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const [count2, setCount2] = useState(0);
  const increase2 = () => setCount2((prev) => prev + 1);
  const decrease2 = () => setCount2((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[18px] text-white">Name</p>
          <Input className="w-[250px]" />
        </div>

        <div>
          <p className="text-[18px] text-white">Date</p>
          <Input className="w-[250px]" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[18px] text-white">Email</p>
          <Input className="w-[250px]" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gaming" className="w-[200px]">
              Add Product
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-white">Add Products</DialogTitle>
            </DialogHeader>

            <div className="">
              <div className="flex items-center justify-between">
                <p className="text-white text-[16px]">Product</p>
                <p className="text-white text-[16px]">Quantity</p>
              </div>

              <div className="flex items-center justify-between">
                <Select>
                  <SelectTrigger className="w-[180px] text-white">
                    <SelectValue placeholder="Wukong" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Wukong</SelectItem>
                    <SelectItem value="light">Wukong</SelectItem>
                    <SelectItem value="light">Wukong</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-4 p-4">
                  <button
                    onClick={decrease}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold">{count}</span>
                  <button
                    onClick={increase}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Select>
                  <SelectTrigger className="w-[180px] text-white">
                    <SelectValue placeholder="Search Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Search Product</SelectItem>
                    <SelectItem value="light">Search Product</SelectItem>
                    <SelectItem value="light">Search Product</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-4 p-4">
                  <button
                    onClick={decrease2}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold">{count2}</span>
                  <button
                    onClick={increase2}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddOrderInputs;
