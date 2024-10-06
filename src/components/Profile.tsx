import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileSection() {
  const [file, setFile] = useState<File | null>(null)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating password change
    setTimeout(() => {
      setPasswordChanged(true)
      setTimeout(() => setPasswordChanged(false), 3000)
    }, 1000)
  }

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
  //     <motion.div
  //       // initial={{ opacity: 0, scale: 0.9 }}
  //       // animate={{ opacity: 1, scale: 1 }}
  //       // transition={{ duration: 0.5 }}
  //       className="w-full max-w-4xl"
  //     >
  //       <Card className="backdrop-blur-lg bg-blue-950/30 shadow-xl rounded-xl overflow-hidden border border-blue-500/20">
  //         <CardContent className="p-0">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <motion.div
  //               initial={{ x: -20, opacity: 0 }}
  //               animate={{ x: 0, opacity: 1 }}
  //               transition={{ delay: 0.2, duration: 0.5 }}
  //               className="p-6 space-y-4 bg-gradient-to-br from-blue-900/50 to-purple-800/50"
  //             >
  //               <Avatar className="w-32 h-32 mx-auto ring-4 ring-blue-400/30 shadow-lg">
  //                 <AvatarImage src="/placeholder.svg" alt="Profile picture" />
  //                 <AvatarFallback>DU</AvatarFallback>
  //               </Avatar>
  //               <div className="text-center space-y-2">
  //                 <h2 className="text-3xl font-bold text-blue-100">DEMOUSER-01</h2>
  //                 <p className="text-blue-300">Software Engineer</p>
  //               </div>
  //               <div className="space-y-2 bg-blue-800/30 p-4 rounded-lg backdrop-blur-sm">
  //                 <p className="text-blue-200"><strong>Branch:</strong> DEMOUSER-01</p>
  //                 <p className="text-blue-200"><strong>Section:</strong> DEMOUSER-01</p>
  //                 <p className="text-blue-200"><strong>Roll Number:</strong> DEMOUSER-01</p>
  //               </div>
  //               <div className="space-y-2 bg-blue-800/30 p-4 rounded-lg backdrop-blur-sm">
  //                 <h3 className="font-semibold text-blue-100">Skills</h3>
  //                 <div className="flex flex-wrap gap-2">
  //                   {["React", "Node.js", "TypeScript", "Python", "AWS"].map((skill) => (
  //                     <span key={skill} className="bg-purple-700/50 text-blue-100 px-2 py-1 rounded-full text-sm">
  //                       {skill}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>
  //             </motion.div>
  //             <div className="p-6 space-y-6">
  //               <motion.div
  //                 initial={{ y: 20, opacity: 0 }}
  //                 animate={{ y: 0, opacity: 1 }}
  //                 transition={{ delay: 0.4, duration: 0.5 }}
  //               >
  //                 <CardHeader className="px-0">
  //                   <CardTitle className="text-blue-100">Change Password</CardTitle>
  //                 </CardHeader>
  //                 <form onSubmit={handlePasswordChange} className="space-y-4">
  //                   <div className="space-y-2">
  //                     <Label htmlFor="old-password" className="text-blue-200">Old Password</Label>
  //                     <Input
  //                       id="old-password"
  //                       type="password"
  //                       required
  //                       value={oldPassword}
  //                       onChange={(e) => setOldPassword(e.target.value)}
  //                       className="bg-blue-900/30 border-blue-500/30 text-blue-100 placeholder-blue-400/50"
  //                     />
  //                   </div>
  //                   <div className="space-y-2">
  //                     <Label htmlFor="new-password" className="text-blue-200">New Password</Label>
  //                     <Input
  //                       id="new-password"
  //                       type="password"
  //                       required
  //                       value={newPassword}
  //                       onChange={(e) => setNewPassword(e.target.value)}
  //                       className="bg-blue-900/30 border-blue-500/30 text-blue-100 placeholder-blue-400/50"
  //                     />
  //                   </div>
  //                   <AnimatePresence>
  //                     {passwordChanged && (
  //                       <motion.div
  //                         initial={{ opacity: 0, y: -10 }}
  //                         animate={{ opacity: 1, y: 0 }}
  //                         exit={{ opacity: 0, y: -10 }}
  //                         className="text-green-400 flex items-center gap-2"
  //                       >
  //                         <Check size={16} />
  //                         Password changed successfully!
  //                       </motion.div>
  //                     )}
  //                   </AnimatePresence>
  //                   <Button
  //                     type="submit"
  //                     className="w-full bg-blue-700/50 hover:bg-blue-600/50 text-blue-100 border border-blue-500/50 transition-all duration-300"
  //                   >
  //                     Change Password
  //                   </Button>
  //                 </form>
  //               </motion.div>
  //               <motion.div
  //                 initial={{ y: 20, opacity: 0 }}
  //                 animate={{ y: 0, opacity: 1 }}
  //                 transition={{ delay: 0.6, duration: 0.5 }}
  //               >
  //                 <CardHeader className="px-0">
  //                   <CardTitle className="text-blue-100">Upload Your Resume</CardTitle>
  //                 </CardHeader>
  //                 <div className="flex items-center justify-center w-full">
  //                   <Label
  //                     htmlFor="dropzone-file"
  //                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-500/30 border-dashed rounded-lg cursor-pointer bg-blue-900/30 hover:bg-blue-800/30 transition-colors duration-300"
  //                   >
  //                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
  //                       <Upload className="w-10 h-10 mb-3 text-blue-300" />
  //                       <p className="mb-2 text-sm text-blue-300">
  //                         <span className="font-semibold">Click to upload</span> or drag and drop
  //                       </p>
  //                       <p className="text-xs text-blue-400">PDF, DOC, DOCX (MAX. 5MB)</p>
  //                     </div>
  //                     <Input
  //                       id="dropzone-file"
  //                       type="file"
  //                       className="hidden"
  //                       onChange={handleFileChange}
  //                       accept=".pdf,.doc,.docx"
  //                     />
  //                   </Label>
  //                 </div>
  //                 <AnimatePresence>
  //                   {file && (
  //                     <motion.p
  //                       initial={{ opacity: 0, y: -10 }}
  //                       animate={{ opacity: 1, y: 0 }}
  //                       exit={{ opacity: 0, y: -10 }}
  //                       className="mt-2 text-sm text-blue-300 flex items-center gap-2"
  //                     >
  //                       <Check size={16} className="text-green-400" />
  //                       File selected: {file.name}
  //                     </motion.p>
  //                   )}
  //                 </AnimatePresence>
  //                 <Button
  //                   className="w-full mt-4 bg-blue-700/50 hover:bg-blue-600/50 text-blue-100 border border-blue-500/50 transition-all duration-300"
  //                   disabled={!file}
  //                 >
  //                   Upload Resume
  //                 </Button>
  //               </motion.div>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </motion.div>
  //   </div>
  // )










  //////////////////////  2nd //////////////////////

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 pt-20">
  //     <motion.div
  //       // initial={{ opacity: 0, scale: 0.9 }}
  //       // animate={{ opacity: 1, scale: 1 }}
  //       // transition={{ duration: 0.5 }}
  //       className="w-full max-w-4xl"
  //     >
  //       <Card className="backdrop-blur-lg bg-gray-900/30 shadow-xl rounded-xl overflow-hidden border border-gray-500/20">
  //         <CardContent className="p-0">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <motion.div
  //               initial={{ x: -20, opacity: 0 }}
  //               animate={{ x: 0, opacity: 1 }}
  //               transition={{ delay: 0.2, duration: 0.5 }}
  //               className="p-6 space-y-4 bg-gradient-to-br from-gray-700/50 to-gray-600/50"
  //             >
  //               <Avatar className="w-32 h-32 mx-auto ring-4 ring-gray-400/30 shadow-lg">
  //                 <AvatarImage src="/placeholder.svg" alt="Profile picture" />
  //                 <AvatarFallback>DU</AvatarFallback>
  //               </Avatar>
  //               <div className="text-center space-y-2">
  //                 <h2 className="text-3xl font-bold text-gray-100">DEMOUSER-01</h2>
  //                 <p className="text-gray-300">Software Engineer</p>
  //               </div>
  //               <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm">
  //                 <p className="text-gray-200"><strong>Branch:</strong> DEMOUSER-01</p>
  //                 <p className="text-gray-200"><strong>Section:</strong> DEMOUSER-01</p>
  //                 <p className="text-gray-200"><strong>Roll Number:</strong> DEMOUSER-01</p>
  //               </div>
  //               <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm">
  //                 <h3 className="font-semibold text-gray-100">Skills</h3>
  //                 <div className="flex flex-wrap gap-2">
  //                   {["React", "Node.js", "TypeScript", "Python", "AWS"].map((skill) => (
  //                     <span key={skill} className="bg-gray-600/50 text-gray-100 px-2 py-1 rounded-full text-sm">
  //                       {skill}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>
  //             </motion.div>
  //             <div className="p-6 space-y-6">
  //               <motion.div
  //                 initial={{ y: 20, opacity: 0 }}
  //                 animate={{ y: 0, opacity: 1 }}
  //                 transition={{ delay: 0.4, duration: 0.5 }}
  //               >
  //                 <CardHeader className="px-0">
  //                   <CardTitle className="text-gray-100">Change Password</CardTitle>
  //                 </CardHeader>
  //                 <form onSubmit={handlePasswordChange} className="space-y-4">
  //                   <div className="space-y-2">
  //                     <Label htmlFor="old-password" className="text-gray-200">Old Password</Label>
  //                     <Input
  //                       id="old-password"
  //                       type="password"
  //                       required
  //                       value={oldPassword}
  //                       onChange={(e) => setOldPassword(e.target.value)}
  //                       className="bg-gray-900/30 border-gray-500/30 text-gray-100 placeholder-gray-400/50"
  //                     />
  //                   </div>
  //                   <div className="space-y-2">
  //                     <Label htmlFor="new-password" className="text-gray-200">New Password</Label>
  //                     <Input
  //                       id="new-password"
  //                       type="password"
  //                       required
  //                       value={newPassword}
  //                       onChange={(e) => setNewPassword(e.target.value)}
  //                       className="bg-gray-900/30 border-gray-500/30 text-gray-100 placeholder-gray-400/50"
  //                     />
  //                   </div>
  //                   <AnimatePresence>
  //                     {passwordChanged && (
  //                       <motion.div
  //                         initial={{ opacity: 0, y: -10 }}
  //                         animate={{ opacity: 1, y: 0 }}
  //                         exit={{ opacity: 0, y: -10 }}
  //                         className="text-green-400 flex items-center gap-2"
  //                       >
  //                         <Check size={16} />
  //                         Password changed successfully!
  //                       </motion.div>
  //                     )}
  //                   </AnimatePresence>
  //                   <Button
  //                     type="submit"
  //                     className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-100 border border-gray-500/50 transition-all duration-300"
  //                   >
  //                     Change Password
  //                   </Button>
  //                 </form>
  //               </motion.div>
  //               <motion.div
  //                 initial={{ y: 20, opacity: 0 }}
  //                 animate={{ y: 0, opacity: 1 }}
  //                 transition={{ delay: 0.6, duration: 0.5 }}
  //               >
  //                 <CardHeader className="px-0">
  //                   <CardTitle className="text-gray-100">Upload Your Resume</CardTitle>
  //                 </CardHeader>
  //                 <div className="flex items-center justify-center w-full">
  //                   <Label
  //                     htmlFor="dropzone-file"
  //                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500/30 border-dashed rounded-lg cursor-pointer bg-gray-900/30 hover:bg-gray-800/30 transition-colors duration-300"
  //                   >
  //                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
  //                       <Upload className="w-10 h-10 mb-3 text-gray-300" />
  //                       <p className="mb-2 text-sm text-gray-300">
  //                         <span className="font-semibold">Click to upload</span> or drag and drop
  //                       </p>
  //                       <p className="text-xs text-gray-400">PDF, DOC, DOCX (MAX. 5MB)</p>
  //                     </div>
  //                     <Input
  //                       id="dropzone-file"
  //                       type="file"
  //                       className="hidden"
  //                       onChange={handleFileChange}
  //                       accept=".pdf,.doc,.docx"
  //                     />
  //                   </Label>
  //                 </div>
  //                 <AnimatePresence>
  //                   {file && (
  //                     <motion.p
  //                       initial={{ opacity: 0, y: -10 }}
  //                       animate={{ opacity: 1, y: 0 }}
  //                       exit={{ opacity: 0, y: -10 }}
  //                       className="mt-2 text-sm text-gray-300 flex items-center gap-2"
  //                     >
  //                       <Check size={16} className="text-green-400" />
  //                       File selected: {file.name}
  //                     </motion.p>
  //                   )}
  //                 </AnimatePresence>
  //                 <Button
  //                   className="w-full mt-4 bg-gray-700/50 hover:bg-gray-600/50 text-gray-100 border border-gray-500/50 transition-all duration-300"
  //                   disabled={!file}
  //                 >
  //                   Upload Resume
  //                 </Button>
  //               </motion.div>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </motion.div>
  //   </div>
  // )


  //////////////////////  3rd //////////////////////

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-teal-900 to-gray-800 pt-20">
      <motion.div
        className="w-full max-w-4xl"
      >
        <Card className="backdrop-blur-lg bg-gray-800/60 shadow-xl rounded-xl overflow-hidden border border-teal-600/30">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-6 space-y-4 bg-gradient-to-br from-teal-800/50 to-gray-700/50"
              >
                <Avatar className="w-32 h-32 mx-auto ring-4 ring-teal-400/30 shadow-lg">
                  <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                  <AvatarFallback>DU</AvatarFallback>
                </Avatar>
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-teal-100">DEMOUSER-01</h2>
                  <p className="text-teal-300">Software Engineer</p>
                </div>
                <div className="space-y-2 bg-teal-800/30 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-teal-200"><strong>Branch:</strong> DEMOUSER-01</p>
                  <p className="text-teal-200"><strong>Section:</strong> DEMOUSER-01</p>
                  <p className="text-teal-200"><strong>Roll Number:</strong> DEMOUSER-01</p>
                </div>
                <div className="space-y-2 bg-teal-800/30 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-teal-100">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "Python", "AWS"].map((skill) => (
                      <span key={skill} className="bg-gray-700/50 text-teal-100 px-2 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              <div className="p-6 space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CardHeader className="px-0">
                    <CardTitle className="text-teal-100">Change Password</CardTitle>
                  </CardHeader>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="old-password" className="text-teal-200">Old Password</Label>
                      <Input
                        id="old-password"
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="bg-gray-900/30 border-teal-500/30 text-teal-100 placeholder-teal-400/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-teal-200">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-900/30 border-teal-500/30 text-teal-100 placeholder-teal-400/50"
                      />
                    </div>
                    <AnimatePresence>
                      {passwordChanged && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-green-400 flex items-center gap-2"
                        >
                          <Check size={16} />
                          Password changed successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Button
                      type="submit"
                      className="w-full bg-teal-700/50 hover:bg-teal-600/50 text-teal-100 border border-teal-500/50 transition-all duration-300"
                    >
                      Change Password
                    </Button>
                  </form>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <CardHeader className="px-0">
                    <CardTitle className="text-teal-100">Upload Your Resume</CardTitle>
                  </CardHeader>
                  <div className="flex items-center justify-center w-full">
                    <Label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-teal-500/30 border-dashed rounded-lg cursor-pointer bg-gray-900/30 hover:bg-teal-900/30 transition-colors duration-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-teal-300" />
                        <p className="mb-2 text-sm text-teal-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-teal-400">PDF, DOC, DOCX (MAX. 5MB)</p>
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </Label>
                  </div>
                  <AnimatePresence>
                    {file && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-teal-300 flex items-center gap-2"
                      >
                        <Check size={16} className="text-green-400" />
                        File selected: {file.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <Button
                    className="w-full mt-4 bg-teal-700/50 hover:bg-teal-600/50 text-teal-100 border border-teal-500/50 transition-all duration-300"
                    disabled={!file}
                  >
                    Upload Resume
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
  
  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 pt-20 pb-5">
  //     <motion.div
  //       className="w-full max-w-4xl"
  //     >
  //       <Card className="backdrop-blur-lg bg-gray-800/70 shadow-xl rounded-xl overflow-hidden border-2 border-slate-600/80 ">
  //         <CardContent className="p-0">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <motion.div
  //               initial={{ x: -20, opacity: 0 }}
  //               animate={{ x: 0, opacity: 1 }}
  //               transition={{ delay: 0.2, duration: 0.5 }}
  //               className="p-6 space-y-4 bg-gradient-to-br from-slate-800/60 to-gray-700/60"
  //             >
  //               <Avatar className="w-32 h-32 mx-auto ring-4 ring-slate-400/20 shadow-lg">
  //                 <AvatarImage src="/placeholder.svg" alt="Profile picture" />
  //                 <AvatarFallback>DU</AvatarFallback>
  //               </Avatar>
  //               <div className="text-center space-y-2">
  //                 <h2 className="text-3xl font-bold text-slate-100">DEMOUSER-01</h2>
  //                 <p className="text-slate-300">Software Engineer</p>
  //               </div>
  //               <div className="space-y-2 bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm">
  //                 <p className="text-slate-200"><strong>Branch:</strong> DEMOUSER-01</p>
  //                 <p className="text-slate-200"><strong>Section:</strong> DEMOUSER-01</p>
  //                 <p className="text-slate-200"><strong>Roll Number:</strong> DEMOUSER-01</p>
  //               </div>
  //               <div className="space-y-2 bg-slate-800/40 p-4 rounded-lg backdrop-blur-sm">
  //                 <h3 className="font-semibold text-slate-100">Skills</h3>
  //                 <div className="flex flex-wrap gap-2">
  //                   {["React", "Node.js", "TypeScript", "Python", "AWS"].map((skill) => (
  //                     <span key={skill} className="bg-slate-700/40 text-slate-100 px-2 py-1 rounded-full text-sm">
  //                       {skill}
  //                     </span>
  //                   ))}
  //                 </div>
  //               </div>
  //             </motion.div>
  //             <div className="p-6 space-y-6">
  //               <motion.div
  //                 initial={{ y: 20, opacity: 0 }}
  //                 animate={{ y: 0, opacity: 1 }}
  //                 transition={{ delay: 0.4, duration: 0.5 }}
  //               >
  //                 <CardHeader className="px-0">
  //                   <CardTitle className="text-slate-100">Change Password</CardTitle>
  //                 </CardHeader>
  //                 <form onSubmit={handlePasswordChange} className="space-y-4">
  //                   <div className="space-y-2">
  //                     <Label htmlFor="old-password" className="text-slate-200">Old Password</Label>
  //                     <Input
  //                       id="old-password"
  //                       type="password"
  //                       required
  //                       value={oldPassword}
  //                       onChange={(e) => setOldPassword(e.target.value)}
  //                       className="bg-gray-900/40 border-slate-500/40 text-slate-100 placeholder-slate-400/60"
  //                     />
  //                   </div>
  //                   <div className="space-y-2">
  //                     <Label htmlFor="new-password" className="text-slate-200">New Password</Label>
  //                     <Input
  //                       id="new-password"
  //                       type="password"
  //                       required
  //                       value={newPassword}
  //                       onChange={(e) => setNewPassword(e.target.value)}
  //                       className="bg-gray-900/40 border-slate-500/40 text-slate-100 placeholder-slate-400/60"
  //                     />
  //                   </div>
  //                   <AnimatePresence>
  //                     {passwordChanged && (
  //                       <motion.div
  //                         initial={{ opacity: 0, y: -10 }}
  //                         animate={{ opacity: 1, y: 0 }}
  //                         exit={{ opacity: 0, y: -10 }}
  //                         className="text-green-400 flex items-center gap-2"
  //                       >
  //                         <Check size={16} />
  //                         Password changed successfully!
  //                       </motion.div>
  //                     )}
  //                   </AnimatePresence>
  //                   <Button
  //                     type="submit"
  //                     className="w-full bg-slate-700/60 hover:bg-slate-600/60 text-slate-100 border border-slate-500/40 transition-all duration-300"
  //                   >
  //                     Change Password
  //                   </Button>
  //                 </form>
  //               </motion.div>
  //               <motion.div
  //                 initial={{ y: 20, opacity: 0 }}
  //                 animate={{ y: 0, opacity: 1 }}
  //                 transition={{ delay: 0.6, duration: 0.5 }}
  //               >
  //                 <CardHeader className="px-0">
  //                   <CardTitle className="text-slate-100">Upload Your Resume</CardTitle>
  //                 </CardHeader>
  //                 <div className="flex items-center justify-center w-full">
  //                   <Label
  //                     htmlFor="dropzone-file"
  //                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-500/40 border-dashed rounded-lg cursor-pointer bg-gray-900/40 hover:bg-slate-800/60 transition-colors duration-300"
  //                   >
  //                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
  //                       <Upload className="w-10 h-10 mb-3 text-slate-300" />
  //                       <p className="mb-2 text-sm text-slate-300">
  //                         <span className="font-semibold">Click to upload</span> or drag and drop
  //                       </p>
  //                       <p className="text-xs text-slate-400">PDF, DOC, DOCX (MAX. 5MB)</p>
  //                     </div>
  //                     <Input
  //                       id="dropzone-file"
  //                       type="file"
  //                       className="hidden"
  //                       onChange={handleFileChange}
  //                       accept=".pdf,.doc,.docx"
  //                     />
  //                   </Label>
  //                 </div>
  //                 <AnimatePresence>
  //                   {file && (
  //                     <motion.p
  //                       initial={{ opacity: 0, y: -10 }}
  //                       animate={{ opacity: 1, y: 0 }}
  //                       exit={{ opacity: 0, y: -10 }}
  //                       className="mt-2 text-sm text-slate-300 flex items-center gap-2"
  //                     >
  //                       <Check size={16} className="text-green-400" />
  //                       File selected: {file.name}
  //                     </motion.p>
  //                   )}
  //                 </AnimatePresence>
  //                 <Button
  //                   className="w-full mt-4 bg-slate-700/60 hover:bg-slate-600/60 text-slate-100 border border-slate-500/40 transition-all duration-300"
  //                   disabled={!file}
  //                 >
  //                   Upload Resume
  //                 </Button>
  //               </motion.div>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </motion.div>
  //   </div>
  // )
  
}