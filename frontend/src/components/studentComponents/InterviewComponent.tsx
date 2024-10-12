import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const questions = [
  "What is polymorphism in object-oriented programming?",
  "What are the key differences between abstract classes and interfaces in Java?",
  "Explain the concept of dependency injection.",
  "How do you handle exceptions in Java?",
  "What are the best practices for writing unit tests in Java?",
  { question: "What is wrong with this code?", code: 'int x = "hello";' },
  {
    question: "What is the error in this code?",
    code: "int[] arr = {1, 2, 3}; System.out.println(arr[3]);",
  },
];

type Message = {
  id: number;
  type: "question" | "answer";
  content: string;
  showFeedback?: boolean;
  isTyping?: boolean;
  feedbackContent?: string;
  isFeedbackTyping?: boolean;
};

export function InterviewComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [codePanelWidth, setCodePanelWidth] = useState(25);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] =
    useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize the first question only once when the component mounts
  useEffect(() => {
    const question = questions[currentQuestion];
    if (typeof question === "string") {
      setMessages([
        {
          id: Date.now(),
          type: "question",
          content: question,
          showFeedback: false,
          isTyping: true,
        },
      ]);
      setShowCodePanel(false);
    } else {
      setMessages([
        {
          id: Date.now(),
          type: "question",
          content: question.question,
          showFeedback: false,
          isTyping: true,
        },
      ]);
      setShowCodePanel(true);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.isTyping ? { ...message, isTyping: false } : message
        )
      );
    }, 1500);

    return () => clearTimeout(typingTimeout);
  }, [messages]);

  const handleAnswer = () => {
    if (inputValue.trim() && !isInterviewComplete) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "answer", content: inputValue },
      ]);
      setInputValue("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        addNewQuestion(currentQuestion + 1);
      } else {
        setIsInterviewComplete(true);
      }
    }
  };

  const addNewQuestion = (questionIndex: number) => {
    const question = questions[questionIndex];
    if (typeof question === "string") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "question",
          content: question,
          showFeedback: false,
          isTyping: true,
        },
      ]);
      setShowCodePanel(false);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "question",
          content: question.question,
          showFeedback: false,
          isTyping: true,
        },
      ]);
      setShowCodePanel(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      addNewQuestion(currentQuestion + 1);
    } else {
      setIsInterviewComplete(true);
    }
  };

  const toggleFeedback = (id: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? {
              ...message,
              showFeedback: !message.showFeedback,
              feedbackContent:
                message.feedbackContent ||
                "Feedback placeholder for this question.",
              isFeedbackTyping: !message.showFeedback,
            }
          : message
      )
    );

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? { ...message, isFeedbackTyping: false } : message
        )
      );
    }, 1500);
  };

  const handleMicClick = () => {
    setIsSpeechRecognitionActive(true);
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + transcript);
      };
      recognition.onend = () => {
        setIsSpeechRecognitionActive(false);
      };
      recognition.start();
    } else {
      alert("Speech recognition is not supported in this browser.");
      setIsSpeechRecognitionActive(false);
    }
  };

  return (
    <div className="flex h-screen pt-20 bg-gray-100">
      <div
        className={`flex-1 flex flex-col p-6 ${
          showCodePanel ? `w-[${100 - codePanelWidth}%]` : "w-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Interview-{currentQuestion + 1}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">Topic- Java</span>
            <Button>Submit</Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mb-6 bg-white rounded-lg shadow-md p-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mb-4 flex ${
                  message.type === "answer" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg max-w-5xl ${
                    message.type === "question"
                      ? "bg-blue-100 text-left"
                      : "bg-green-100 text-right"
                  }`}
                >
                  {message.isTyping ? (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="block overflow-hidden whitespace-nowrap"
                    >
                      {message.content}
                    </motion.span>
                  ) : (
                    message.content
                  )}
                  {message.type === "question" && index !== 0 && (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 text-xs"
                        onClick={() => toggleFeedback(message.id)}
                      >
                        {message.showFeedback ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        )}
                        Toggle Feedback
                      </Button>
                      <AnimatePresence>
                        {message.showFeedback && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 p-2 bg-gray-100 rounded-lg text-sm"
                          >
                            {message.isFeedbackTyping ? (
                              <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{
                                  duration: 1.5,
                                  ease: "easeInOut",
                                }}
                                className="block overflow-hidden whitespace-nowrap"
                              >
                                {message.feedbackContent}
                              </motion.span>
                            ) : (
                              message.feedbackContent
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
        <div className="flex items-center space-x-2 relative">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="rounded-full shadow-md p-2 bg-white"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleMicClick}
              disabled={isSpeechRecognitionActive || isInterviewComplete}
            >
              <Mic
                className={`h-4 w-4 ${
                  isSpeechRecognitionActive ? "text-red-500" : ""
                }`}
              />
            </Button>
          </motion.div>
          <div className="flex-1 relative group">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isInterviewComplete
                  ? "Interview complete"
                  : "Type your answer here..."
              }
              className="w-full"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isInterviewComplete) {
                  e.preventDefault();
                  handleAnswer();
                }
              }}
              disabled={isInterviewComplete}
            />
            {isInterviewComplete && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-gray-800 font-medium text-center">
                  Your interview is done, please submit to see the results
                </p>
              </div>
            )}
          </div>
          <Button onClick={handleAnswer} disabled={isInterviewComplete}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-around mt-4">
          <Button
            variant="outline"
            className="bg-slate-800 text-white shadow-lg"
            onClick={() => setCurrentQuestion(currentQuestion)}
            disabled={isInterviewComplete}
          >
            Rephrase the Question
          </Button>
          <Button
            variant="outline"
            className="bg-slate-800 text-white shadow-lg"
            onClick={handleSkip}
            disabled={isInterviewComplete}
          >
            Skip the Question
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {showCodePanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${codePanelWidth}%`, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-200 p-6 overflow-y-auto relative"
          >
            <div className="absolute top-2 left-2 right-2">
              <Slider
                defaultValue={[codePanelWidth]}
                max={50}
                min={20}
                step={1}
                onValueChange={([value]) => setCodePanelWidth(value)}
              />
            </div>
            <div className="mt-8 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-4">Code Related Question</h2>
              {typeof questions[currentQuestion] === "object" && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">
                    Code - {currentQuestion + 1}
                  </h3>
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <code>
                      {(questions[currentQuestion] as { code: string }).code}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




/// version 2 --- need some fixes

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Mic, Send, ChevronDown, ChevronUp, GripVertical } from "lucide-react"

// interface Question {
//   original: string
//   rephrased: [string, string]
//   code?: {
//     language: string
//     snippet: string
//   }
// }

// const questions: Question[] = [
//   {
//     original: "What is polymorphism in object-oriented programming?",
//     rephrased: [
//       "Can you explain the concept of polymorphism and its importance in OOP?",
//       "How does polymorphism contribute to code flexibility in object-oriented design?"
//     ]
//   },
//   {
//     original: "What are the key differences between abstract classes and interfaces in Java?",
//     rephrased: [
//       "Compare and contrast abstract classes and interfaces in Java. When would you use one over the other?",
//       "How do abstract classes and interfaces in Java differ in terms of implementation and usage?"
//     ]
//   },
//   {
//     original: "Explain the concept of dependency injection.",
//     rephrased: [
//       "What is dependency injection, and how does it promote loose coupling in software design?",
//       "Can you describe the benefits and implementation of dependency injection in modern applications?"
//     ]
//   },
//   {
//     original: "How do you handle exceptions in Java?",
//     rephrased: [
//       "Describe the process of exception handling in Java and its importance in robust programming.",
//       "What are the best practices for implementing exception handling in Java applications?"
//     ]
//   },
//   {
//     original: "What are the best practices for writing unit tests in Java?",
//     rephrased: [
//       "Discuss the key principles and techniques for effective unit testing in Java.",
//       "How can you ensure comprehensive code coverage when writing unit tests for Java applications?"
//     ]
//   },
//   {
//     original: "What is wrong with this code?",
//     rephrased: [
//       "Identify and explain the error in the following Java code snippet.",
//       "What issue can you spot in this piece of Java code, and how would you fix it?"
//     ],
//     code: {
//       language: "java",
//       snippet: `
// int x = "hello";
// System.out.println(x);
//       `
//     }
//   },
//   {
//     original: "What is the error in this code?",
//     rephrased: [
//       "Analyze this Java code snippet and describe the runtime error it would produce.",
//       "What problem would occur when executing this Java code, and how can it be resolved?"
//     ],
//     code: {
//       language: "java",
//       snippet: `
// int[] arr = {1, 2, 3};
// System.out.println(arr[3]);
//       `
//     }
//   },
// ]

// type Message = {
//   id: number
//   type: "question" | "answer" | "loading"
//   content: string
//   showFeedback?: boolean
//   isTyping?: boolean
//   feedbackContent?: string
//   isFeedbackTyping?: boolean
//   questionNumber?: number
// }

// type CodeBlock = {
//   questionNumber: number
//   language: string
//   code: string
// }

// const LoadingDots = () => (
//   <motion.div className="flex space-x-1">
//     {[0, 1, 2].map((dot) => (
//       <motion.div
//         key={dot}
//         className="w-2 h-2 bg-blue-500 rounded-full"
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [1, 0.5, 1],
//         }}
//         transition={{
//           duration: 0.6,
//           repeat: Infinity,
//           delay: dot * 0.2,
//         }}
//       />
//     ))}
//   </motion.div>
// )

// export default function InterviewComponent() {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
//     const savedQuestion = localStorage.getItem('currentQuestion')
//     return savedQuestion ? parseInt(savedQuestion, 10) : 0
//   })
//   const [showCodePanel, setShowCodePanel] = useState(false)
//   const [inputValue, setInputValue] = useState("")
//   const [isInterviewComplete, setIsInterviewComplete] = useState(false)
//   const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [hasRephrased, setHasRephrased] = useState(false)
//   const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([])
//   const [codePanelWidth, setCodePanelWidth] = useState(400)
//   const chatEndRef = useRef<HTMLDivElement>(null)
//   const resizeRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (currentQuestion < questions.length) {
//       setIsLoading(true)
//       setMessages(prev => [...prev, { id: Date.now(), type: "loading", content: "" }])

//       setTimeout(() => {
//         setMessages(prev => prev.filter(msg => msg.type !== "loading"))
        
//         const question = questions[currentQuestion]
//         setMessages(prev => [
//           ...prev,
//           {
//             id: Date.now(),
//             type: "question",
//             content: question.original,
//             showFeedback: false,
//             isTyping: true,
//             questionNumber: currentQuestion + 1,
//           }
//         ])
        
//         if (question.code) {
//           setCodeBlocks(prev => [{
//             questionNumber: currentQuestion + 1,
//             language: question.code!.language,
//             code: question.code!.snippet
//           }, ...prev])
//           setShowCodePanel(true)
//         }
        
//         setIsLoading(false)
//         setHasRephrased(false)
//       }, 1500)
//     } else {
//       setIsInterviewComplete(true)
//     }
//   }, [currentQuestion])

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   useEffect(() => {
//     const typingTimeout = setTimeout(() => {
//       setMessages(prev => prev.map(message => 
//         message.isTyping ? { ...message, isTyping: false } : message
//       ))
//     }, 1500)

//     return () => clearTimeout(typingTimeout)
//   }, [messages])

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (resizeRef.current && resizeRef.current.dataset.resizing === "true") {
//         const newWidth = window.innerWidth - e.clientX
//         setCodePanelWidth(Math.min(Math.max(newWidth, 300), 600))
//       }
//     }

//     const handleMouseUp = () => {
//       if (resizeRef.current) {
//         resizeRef.current.dataset.resizing = "false"
//       }
//     }

//     document.addEventListener("mousemove", handleMouseMove)
//     document.addEventListener("mouseup", handleMouseUp)

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove)
//       document.removeEventListener("mouseup", handleMouseUp)
//     }
//   }, [])

//   const handleAnswer = () => {
//     if (inputValue.trim() && !isInterviewComplete && !isLoading) {
//       setMessages(prev => [...prev, { id: Date.now(), type: "answer", content: inputValue }])
//       setInputValue("")
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1)
//         localStorage.setItem('currentQuestion', (currentQuestion + 1).toString())
//       } else {
//         setIsInterviewComplete(true)
//       }
//     }
//   }

//   const handleSkip = () => {
//     if (currentQuestion < questions.length - 1 && !isLoading) {
//       setCurrentQuestion(currentQuestion + 1)
//       localStorage.setItem('currentQuestion', (currentQuestion + 1).toString())
//     } else if (!isLoading) {
//       setIsInterviewComplete(true)
//     }
//   }

//   const toggleFeedback = (id: number) => {
//     setMessages(prev =>
//       prev.map(message =>
//         message.id === id
//           ? {
//               ...message,
//               showFeedback: !message.showFeedback,
//               feedbackContent: message.feedbackContent || "Feedback placeholder for this question.",
//               isFeedbackTyping: !message.showFeedback
//             }
//           : message
//       )
//     )

//     setTimeout(() => {
//       setMessages(prev =>
//         prev.map(message =>
//           message.id === id ? { ...message, isFeedbackTyping: false } : message
//         )
//       )
//     }, 1500)
//   }

//   const handleMicClick = () => {
//     if (isLoading) return

//     setIsSpeechRecognitionActive(true)
//     if ('webkitSpeechRecognition' in window) {
//       const recognition = new (window as any).webkitSpeechRecognition()
//       recognition.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript
//         setInputValue(prev => prev + transcript)
//       }
//       recognition.onend = () => {
//         setIsSpeechRecognitionActive(false)
//       }
//       recognition.start()
//     } else {
//       alert("Speech recognition is not supported in this browser.")
//       setIsSpeechRecognitionActive(false)
//     }
//   }

//   const handleRephrase = () => {
//     if (!hasRephrased && currentQuestion < questions.length && !isLoading) {
//       const rephrasedIndex = Math.floor(Math.random() * 2)
//       const rephrasedQuestion = questions[currentQuestion].rephrased[rephrasedIndex]
//       setMessages(prev => [
//         ...prev,
//         {
//           id: Date.now(),
//           type: "question",
//           content: rephrasedQuestion,
//           showFeedback: false,
//           isTyping: true,
//           questionNumber: currentQuestion + 1,
//         }
//       ])
//       setHasRephrased(true)
//     }
//   }

//   return (
//     <div className="flex h-screen bg-gray-100 mt-20">
//       <div className="flex-1 flex flex-col p-6" style={{ width: `calc(100% - ${codePanelWidth}px)` }}>
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Interview-{currentQuestion + 1}</h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-lg font-medium">Topic- Java</span>
//             <Button>Submit</Button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto mb-6 bg-white rounded-lg shadow-md p-4">
//           <AnimatePresence>
//             {messages.map((message, index) => (
//               <motion.div
//                 key={message.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className={`mb-4 ${message.type === "answer" ? "text-right" : "text-left"}`}
//               >
//                 {message.type === "loading" ? (
//                   <LoadingDots />
//                 ) : (
//                   <div>
//                     <p className={`inline-block p-2 rounded-lg ${message.type === "question" ? "bg-blue-100" : "bg-green-100"}`}>
//                       {message.isTyping ? (
//                         <motion.span
//                           initial={{ width: 0 }}
//                           animate={{ width: "100%" }}
//                           transition={{ duration: 1.5, ease: "easeInOut" }}
//                           className="block overflow-hidden whitespace-nowrap"
//                         >
//                           {message.content}
//                         </motion.span>
//                       ) : (
//                         message.content
//                       )}
//                     </p>
//                     {message.type === "question" && index !== 0 && (
//                       <div>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="mt-1 text-xs"
//                           onClick={() => toggleFeedback(message.id)}
//                         >
//                           {message.showFeedback ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
//                           Toggle Feedback
//                         </Button>
//                         <AnimatePresence>
//                           {message.showFeedback && (
//                             <motion.div
//                               initial={{ opacity: 0, height: 0 }}
//                               animate={{ opacity: 1, height: "auto" }}
//                               exit={{ opacity: 0, height: 0 }}
//                               transition={{ duration: 0.3 }}
//                               className="mt-2 p-2 bg-gray-100 rounded-lg text-sm"
//                             >
//                               {message.isFeedbackTyping ? (
//                                 <motion.span
//                                   initial={{ width: 0 }}
//                                   animate={{ width: "100%" }}
//                                   transition={{ duration: 1.5, ease: "easeInOut" }}
//                                   className="block overflow-hidden whitespace-nowrap"
//                                 >
//                                   {message.feedbackContent}
//                                 </motion.span>
//                               ) : (
//                                 message.feedbackContent
//                               )}
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </AnimatePresence>
//           <div ref={chatEndRef} />
//         </div>
//         <div className="flex items-center space-x-2 relative">
//           <motion.div
//             whileTap={{ scale: 0.95 }}
//             className="rounded-full shadow-md p-2 bg-white"
//           >
//             <Button
//               variant="ghost"
//               size="icon"
//               className="rounded-full"
//               onClick={handleMicClick}
//               disabled={isSpeechRecognitionActive || isInterviewComplete || isLoading}
//             >
//               <Mic className={`h-4 w-4 ${isSpeechRecognitionActive ? 'text-red-500' : ''}`} />
//             </Button>
//           </motion.div>
//           <div className="flex-1 relative group">
//             <Textarea
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder={isInterviewComplete ? "Interview complete" : "Type your answer here..."}
//               className="w-full"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey && !isInterviewComplete && !isLoading) {
//                   e.preventDefault()
//                   handleAnswer()
//                 }
//               }}
//               disabled={isInterviewComplete || isLoading}
//             />
//             {isInterviewComplete && (
//               <div className="absolute inset-0 bg-gray-200  bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <p className="text-gray-800 font-medium text-center">
//                   Your interview is done, please submit to see the results
//                 </p>
//               </div>
//             )}
//           </div>
//           <Button onClick={handleAnswer} disabled={isInterviewComplete || isLoading}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="flex justify-between mt-4">
//           <Button variant="outline" onClick={handleRephrase} disabled={isInterviewComplete || hasRephrased || isLoading}>
//             Rephrase the Question
//           </Button>
//           <Button variant="outline" onClick={handleSkip} disabled={isInterviewComplete || isLoading}>
//             Skip the Question
//           </Button>
//         </div>
//       </div>
//       <AnimatePresence>
//         {showCodePanel && (
//           <motion.div
//             initial={{ width: 0, opacity: 0 }}
//             animate={{ width: codePanelWidth, opacity: 1 }}
//             exit={{ width: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="bg-gray-200 overflow-y-auto relative"
//             style={{ width: `${codePanelWidth}px` }}
//           >
//             <div
//               ref={resizeRef}
//               className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize bg-gray-300 hover:bg-gray-400 transition-colors"
//               onMouseDown={() => {
//                 if (resizeRef.current) {
//                   resizeRef.current.dataset.resizing = "true"
//                 }
//               }}
//             />
//             <div className="p-6 space-y-4">
//               <h2 className="text-xl font-bold mb-4">Code Blocks</h2>
//               {codeBlocks.map((block, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-md p-4">
//                   <h3 className="text-lg font-semibold mb-2">Question {block.questionNumber}</h3>
//                   <div className="bg-gray-100 p-2 rounded-md text-sm mb-2">
//                     Language: {block.language}
//                   </div>
//                   <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
//                     <code>{block.code}</code>
//                   </pre>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }