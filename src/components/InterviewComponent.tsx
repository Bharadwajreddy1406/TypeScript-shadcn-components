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