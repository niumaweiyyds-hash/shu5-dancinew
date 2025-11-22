/** @type {import('tailwindcss').Config} */
export default {
  // 确保 Tailwind 扫描所有包含 Tailwind 类的文件
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 设置默认字体为无衬线字体 (Inter)
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}