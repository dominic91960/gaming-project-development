import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SystemRequirementsProps {
  minimumOS: string;
  minimumCPU: string;
  minimumRAM: string;
  minimumStorage: string;
  minimumGPU: string;
  recommendedOS: string;
  recommendedCPU: string;
  recommendedRAM: string;
  recommendedStorage: string;
  recommendedGPU: string;
}

const SystemRequirements = ({
  minimumOS,
  minimumCPU,
  minimumRAM,
  minimumStorage,
  minimumGPU,
  recommendedOS,
  recommendedCPU,
  recommendedRAM,
  recommendedStorage,
  recommendedGPU,
  setMinimumOS,
  setMinimumCPU,
  setMinimumRAM,
  setMinimumStorage,
  setMinimumGPU,
  setRecommendedOS,
  setRecommendedCPU,
  setRecommendedRAM,
  setRecommendedStorage,
  setRecommendedGPU,
}: SystemRequirementsProps & {
  setMinimumOS: (value: string) => void;
  setMinimumCPU: (value: string) => void;
  setMinimumRAM: (value: string) => void;
  setMinimumStorage: (value: string) => void;
  setMinimumGPU: (value: string) => void;
  setRecommendedOS: (value: string) => void;
  setRecommendedCPU: (value: string) => void;
  setRecommendedRAM: (value: string) => void;
  setRecommendedStorage: (value: string) => void;
  setRecommendedGPU: (value: string) => void;
}) => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="h-fit bg-transparent flex justify-between p-0 *:h-fit *:text-[1em] *:text-white *:py-[0.5em] *:rounded-sm">
        <TabsTrigger value="windows">Windows</TabsTrigger>
        <TabsTrigger value="xbox">Xbox</TabsTrigger>
        <TabsTrigger value="playstation">Playstation</TabsTrigger>
      </TabsList>
      <TabsContent value="windows">
        <p className="text-white text-[1.3em] font-semibold mb-6 mt-6">
          Minimum System Requirements
        </p>

        <div>
          <div className="grid grid-cols-12 mb-8 content-center items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Operating System</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setMinimumOS}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Operating System" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="WINDOWS 10 / 11 WITH DIRECTX 12"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    WINDOWS 10 / 11 WITH DIRECTX 12
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">CPU</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setMinimumCPU}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select CPU" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Graphics</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setMinimumGPU}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Graphics" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC
                    A750 · 8GB (REBAR ON)
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Ram Memory</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setMinimumRAM}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Memory" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="16 GB (dual-channel mode)"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    16 GB (dual-channel mode)
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Storage</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setMinimumStorage}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Storage" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="65 GB SSD"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    65 GB SSD
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Resolution</p>
            </div>

            <div className="col-span-9">
              <Select>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Resolution" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="1080p / 30 Fps / Low Preset with Upscaler Set to Quality"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    1080p / 30 Fps / Low Preset with Upscaler Set to Quality
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <p className="text-white text-[1.3em] font-semibold mb-6 mt-10">
          Recommended System Requirements
        </p>

        <div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Operating System</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setRecommendedOS}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Operating System" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="WINDOWS 10 / 11 WITH DIRECTX 12"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    WINDOWS 10 / 11 WITH DIRECTX 12
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">CPU</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setRecommendedCPU}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select CPU" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Graphics</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setRecommendedGPU}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Graphics" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC
                    A750 · 8GB (REBAR ON)
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Ram Memory</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setRecommendedRAM}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Memory" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="16 GB (dual-channel mode)"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    16 GB (dual-channel mode)
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Storage</p>
            </div>

            <div className="col-span-9">
              <Select onValueChange={setRecommendedStorage}>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Storage" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="65 GB SSD"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    65 GB SSD
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-8 items-center">
            <div className="col-span-3">
              <p className="text-white font-medium">Resolution</p>
            </div>

            <div className="col-span-9">
              <Select>
                <SelectTrigger className="h-fit px-[1em] py-[0.5em] text-[9px] border-[#606060] rounded-sm sm:text-[10px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
                  <SelectValue placeholder="Select Resolution" />
                </SelectTrigger>
                <SelectContent className="bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                  <SelectItem
                    value="1080p / 30 Fps / Low Preset with Upscaler Set to Quality"
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    1080p / 30 Fps / Low Preset with Upscaler Set to Quality
                  </SelectItem>
                  <SelectItem
                    value="More Options.."
                    className="h-fit ps-[4.5ch] px-[1em] py-[0.5em] my-[0.5em] text-[9px] sm:text-[10px] md:text-[11px] lg:ps-[3.5ch] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
                  >
                    More Options..
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="xbox"></TabsContent>

      <TabsContent value="playstation"></TabsContent>
    </Tabs>
  );
};

export default SystemRequirements;
