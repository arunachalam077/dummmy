import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 mb-6 w-full text-lg transform hover:scale-105 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const FloatingShape = ({ animate }) => (
  <motion.div
    className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70"
    animate={animate}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
)

export default function Embed() {
  const [bgColor, setBgColor] = useState("from-purple-600 via-pink-500 to-orange-400")
  const navigate = useNavigate();
  const dashClick = () => {
    navigate('/dashboard');
  };
  
  const Click =() =>{
    navigate('/settings/policy')
  }
  useEffect(() => {
    const colors = [
      "from-purple-600 via-pink-500 to-orange-400",
      "from-blue-500 via-purple-500 to-pink-500",
      "from-green-400 via-cyan-500 to-blue-500",
    ]
    let colorIndex = 0
    const intervalId = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length
      setBgColor(colors[colorIndex])
    }, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={`min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${bgColor} transition-colors duration-1000`}>
      <FloatingShape
        animate={{
          scale: [1, 2, 2, 1, 1],
          x: [0, 200, 200, 0, 0],
          y: [0, 100, 200, 100, 0],
          backgroundColor: ["#f472b6", "#818cf8", "#f472b6"],
        }}
      />
      <FloatingShape
        animate={{
          scale: [1, 2, 2, 1, 1],
          x: [0, -200, -200, 0, 0],
          y: [0, -100, -200, -100, 0],
          backgroundColor: ["#fca5a5", "#93c5fd", "#fca5a5"],
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl max-w-md w-full mx-4 text-center relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl font-extrabold mb-4 text-white tracking-tight"
        >
          InstaX bot
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl mb-8 text-white font-light"
        >
          Supercharge your Instagram growth with AI-powered automation
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button onClick={dashClick}>
            Get Started
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a 
            onClick={Click}
            className="text-white hover:text-yellow-200 transition duration-300 underline text-sm"
          >
            Privacy Policy
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}