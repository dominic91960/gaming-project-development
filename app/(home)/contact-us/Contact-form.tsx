// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";
// import Rectangle from "@/public/images/contact-us/Rectangle.png";
// import Avatar from "@/public/images/contact-us/avatar.png";

// export default function ContactForm() {
//   return (
//     <div className="relative">
//       <div className="hidden lg:block absolute inset-0 lg:bg-opacity-10 z-[-1]">
//         <Image
//           src={Rectangle}
//           alt="Rectangle Background"
//           className="absolute inset-0 w-full h-full object-cover"
//           style={{ opacity: 0.2 }}
//         />
//       </div>

//       {/* Form */}
//       <div className="bg-white bg-opacity-[6%] p-6 text-left lg:py-[84px] relative">
//         <div className="lg:ml-[8em] xl:ml-[10em] lg:w-2/5">
//           <p className="text-[#0BDB45] text-[7px] md:text-[10px] lg:text-[15px] xl:text-[17px]">
//             Need Some Help?
//           </p>
//           <h2 className="text-[13px] text-white md:text-[20px] lg:text-[25px] xl:text-[30px] font-bold pb-[0.5em]">
//             Get In Touch
//           </h2>
//           <p className="text-[7px] text-white md:text-[10px] lg:text-[15px] xl:text-[17px] mb-[1em]">
//             Whatever your question, we are here to help
//           </p>
//           <form className="space-y-4">
//             <div>
//               <Label
//                 htmlFor="name"
//                 className="block text-left text-[7px] text-white md:text-[10px] lg:text-[15px] xl:text-[20px]"
//               >
//                 Name
//               </Label>
//               <Input
//                 placeholder="Name"
//                 type="text"
//                 name="name"
//                 className="bg-white bg-opacity-[10%] text-white rounded-none border-none placeholder:text-slate-300 text-[7px] md:text-[10px] lg:text-[15px] h-[3em] w-full"
//               />
//             </div>
//             <div>
//               <Label
//                 htmlFor="email"
//                 className="block text-left text-[7px] text-white md:text-[10px] lg:text-[15px] xl:text-[20px]"
//               >
//                 Email
//               </Label>
//               <Input
//                 placeholder="Email"
//                 type="email"
//                 name="email"
//                 className="bg-white bg-opacity-[10%] text-white rounded-none border-none placeholder:text-slate-300 text-[7px] md:text-[10px] lg:text-[15px] h-[3em] w-full"
//               />
//             </div>
//             <div>
//               <Label
//                 htmlFor="message"
//                 className="block text-left text-[7px] text-white md:text-[10px] lg:text-[15px] xl:text-[20px]"
//               >
//                 Message
//               </Label>
//               <Textarea
//                 placeholder="Message"
//                 name="message"
//                 className="bg-white bg-opacity-[10%] text-white rounded-none border-none placeholder:text-slate-300 text-[7px] md:text-[10px] lg:text-[15px] h-[3em] mb-4 w-full"
//               />
//             </div>
//             <Button
//               variant="gaming"
//               type="submit"
//               className="flex-1 font-extrabold bg-[#0BDB45] text-center rounded-none cursor-pointer w-full text-black h-[3em] text-[7px] md:text-[10px] lg:text-[15px] lg:w-1/2"
//             >
//               SEND
//             </Button>
//           </form>
//         </div>

//         <div className="hidden lg:block absolute inset-x-0 bottom-0 ml-[400px] xl:ml-[500px] 2xl:ml-[600px] lg:w-1/2 xl:w-3/6 2xl:w-2/5 z-20">
//           <Image src={Avatar} alt="Avatar" className="object-cover mx-auto" />
//         </div>
//       </div>
//     </div>
//   );
// }
