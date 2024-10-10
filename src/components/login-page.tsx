import React, { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

// Assuming these components are defined in your project
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function LoginPageComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleCaptchaVerification = () => {
    // Simulate captcha verification
    setTimeout(() => setIsCaptchaVerified(true), 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4 relative overflow-hidden">
      {/* Blurred background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/2 w-1/3 h-1/3 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[240px] mb-8"
      >
        <div className="text-4xl font-bold text-white text-center">Company Logo</div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 w-full max-w-[350px]"
      >
        <Card className="w-full backdrop-blur-md bg-white/10">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center text-white">Login</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-white">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    placeholder="Enter your roll number"
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={handleCaptchaVerification}
                    disabled={isCaptchaVerified}
                  >
                    {isCaptchaVerified ? "Captcha Verified" : "Verify Captcha"}
                  </Button>
                </div>
              </div>
              <CardFooter className="flex justify-center mt-6 p-0">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading || !isCaptchaVerified}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}