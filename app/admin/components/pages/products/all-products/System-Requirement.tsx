import { useState } from "react";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SystemRequirements = () => {
  const [selectedTab, setSelectedTab] = useState("windows");
  const [selectedIcon, setSelectedIcon] = useState("minimum");

  // State for each dropdown selection
  const [operatingSystem, setOperatingSystem] = useState(
    "WINDOWS 10 / 11 WITH DIRECTX 12"
  );
  const [cpu, setCpu] = useState("INTEL® CORE™ I7-4770K, AMD RYZEN™ 5 3600");
  const [graphics, setGraphics] = useState("GEFORCE GTX 1660 - 6GB");
  const [ram, setRam] = useState("16 GB (Dual-Channel Mode)");
  const [storage, setStorage] = useState("65 GB SSD");
  const [resolution, setResolution] = useState(
    "1080p / 30 Fps / Low Preset With Upscaler Set To Quality"
  );

  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="xbox">Xbox</TabsTrigger>
          <TabsTrigger value="playstation">Playstation</TabsTrigger>
        </TabsList>
        <TabsContent value="windows">
          <div className="mb-8 mt-6">
            <div>
              <p className="text-white font-medium text-[16px] mb-2">
                Select Icon
              </p>
            </div>

            <div>
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select Operating System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Minimum</SelectItem>
                  <SelectItem value="dark">Recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-2">
              <p className="text-white font-medium text-[16px]">
                Operating System
              </p>
            </div>

            <div className="col-span-10">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Operating System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    WINDOWS 10 / 11 WITH DIRECTX 12
                  </SelectItem>
                  <SelectItem value="dark">More Options..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-2">
              <p className="text-white font-medium text-[16px]">CPU</p>
            </div>

            <div className="col-span-10">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select CPU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600
                  </SelectItem>
                  <SelectItem value="dark">More Options..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-2">
              <p className="text-white font-medium text-[16px]">Graphics</p>
            </div>

            <div className="col-span-10">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Graphics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC
                    A750 · 8GB (REBAR ON)
                  </SelectItem>
                  <SelectItem value="dark">More Options..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-2">
              <p className="text-white font-medium text-[16px]">Ram Memory</p>
            </div>

            <div className="col-span-10">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Memory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    16 GB (dual-channel mode)
                  </SelectItem>
                  <SelectItem value="dark">More Options..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-2">
              <p className="text-white font-medium text-[16px]">Storage</p>
            </div>

            <div className="col-span-10">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Storage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">65 GB SSD</SelectItem>
                  <SelectItem value="dark">More Options..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-2">
              <p className="text-white font-medium text-[16px]">Resolution</p>
            </div>

            <div className="col-span-10">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    1080p / 30 Fps / Low Preset with Upscaler Set to Quality
                  </SelectItem>
                  <SelectItem value="dark">More Options..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="xbox"></TabsContent>

        <TabsContent value="playstation"></TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemRequirements;
