import React, { useState, useEffect } from 'react';
import { BookOpen, Music, MessageCircle, CheckCircle, XCircle, Play, Star, Heart, Send, User, Lock, Loader2, Info, AlertTriangle, Check } from 'lucide-react';

// --- 数据配置区域 ---

// 1. 单词数据
const vocabList = [
    { word: "print", phonetic: "[print]", type: "v./n.", meaning: "打印, 印刷, 出版; 印刷" },
    { word: "weight", phonetic: "[weit]", type: "v./n.", meaning: "使负重; 重量, 分量" },
    { word: "height", phonetic: "[hait]", type: "n.", meaning: "高度, 高处, 高地" },
    { word: "left", phonetic: "[left]", type: "n.", 查询: "左边, 左转弯" },
    { word: "right", phonetic: "[rait]", type: "n.", meaning: "右边" },
    { word: "up", phonetic: "[ʌp]", type: "n.", meaning: "上面, 高处" },
    { word: "down", phonetic: "[daun]", type: "adv.", meaning: "下降, 向下" },
];

// 2. 知识点数据
const knowledgePoints = [
    {
        title: "print() 命令",
        content: "print是打印的意思。这个命令由英文单词print和一对英文小括号组成,在括号中填入内容,就能将括号中的内容打印到输出区。",
        tags: ["基础", "重点"]
    },
    {
        title: "print() 命令的规则",
        content: "规则1：打印文字时,文字两侧需要加上引号。\n规则2：在括号中填写数学算式,会计算并打印出算式的结果。",
        tags: ["语法", "规则"]
    },
    {
        title: "变量",
        content: "变量就像一个盒子,可以存储各种各样的数据。只需要使用一个等号,就可以将数据装进盒子里。",
        tags: ["概念"]
    },
    {
        title: "变量的规则",
        content: "规则1：使用print()语句打印变量时,变量两侧不需要加上引号。\n规则2：我们可以在程序中反复使用变量,也可以使用变量进行数学运算。",
        tags: ["进阶", "难点"]
    }
];

// 重难点摘要
const keyPoints = [
    "print()命令打印文字时，文字两侧要加上单引号。",
    "如果括号中填写的是数学算式，会直接打印出计算结果。"
];

// 3. 习题数据
const quizQuestions = [
    {
        id: 1,
        question: "下列选项中,能够正确打印出小明的是（ ）",
        options: [
            { id: "A", text: "PRINT('小明')" },
            { id: "B", text: "print('小明')" },
            { id: "C", text: "print'小明'" },
            { id: "D", text: "print(小明)" },
        ],
        correct: "B",
        explanation: "Python区分大小写，命令必须是print；打印文字必须加括号和引号。"
    },
    {
        id: 2,
        question: "执行下列代码,输出的结果是( )\n1 n = 12\n2 print(n)",
        options: [
            { id: "A", text: "n" },
            { id: "B", text: "12" },
            { id: "C", text: "'12'" },
            { id: "D", text: "n=12" },
        ],
        correct: "B",
        explanation: "变量n被赋值为12，print(n)打印的是变量里的值，不需要加引号。"
    },
    {
        id: 3,
        question: "下方代码的横线上填写____,可以依次打印出20和40。\n1 print(20)\n2 _______\n3 print(a)",
        options: [
            { id: "A", text: "a=20" },
            { id: "B", text: "a=40" },
            { id: "C", text: "n=40" },
            { id: "D", text: "print('20')" },
        ],
        correct: "B",
        explanation: "为了让第三行print(a)打印出40，必须在第二行将变量a赋值为40。"
    }
];

// --- 通用消息提示组件 (替换 alert) ---

const Toast = ({ message, type }) => {
    if (!message) return null;

    let bgColor = 'bg-blue-500';
    let Icon = Info;

    if (type === 'success') {
        bgColor = 'bg-green-500';
        Icon = CheckCircle;
    } else if (type === 'error') {
        bgColor = 'bg-red-500';
        Icon = AlertTriangle;
    }

    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-out">
            <div className={`flex items-center p-3 rounded-lg shadow-xl text-white ${bgColor}`}>
                <Icon size={20} className="mr-2" />
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
};

// --- 主应用组件 ---

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('info');

    // 消息提示函数
    const showToast = (message, type = 'info') => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => setToastMessage(''), 3000);
    };

    // 导航栏项目
    const NavItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center w-full py-2 text-xs transition-colors ${
                activeTab === id ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
            }`}
        >
            <Icon size={20} className={`mb-1 ${activeTab === id ? 'stroke-2' : 'stroke-1'}`} />
            <span>{label}</span>
        </button>
    );

    const renderSection = () => {
        switch (activeTab) {
            case 'home':
                return <HomeSection />;
            case 'vocab':
                return <VocabSection showToast={showToast} />;
            case 'knowledge':
                return <KnowledgeSection />;
            case 'quiz':
                return <QuizSection />;
            case 'message':
                return <MessageSection showToast={showToast} />;
            default:
                return <HomeSection />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 font-sans pb-16">
            <Toast message={toastMessage} type={toastType} />
            
            {/* 顶部标题栏 */}
            <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <h1 className="text-lg font-bold flex items-center">
                        <BookOpen className="mr-2" size={20} />
                        L1-1 赛考冲刺站
                    </h1>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">Python基础</span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-4">
                {renderSection()}
            </main>

            {/* 底部导航 */}
            <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around shadow-lg max-w-screen z-50">
                <NavItem id="home" icon={Star} label="首页" />
                <NavItem id="vocab" icon={Music} label="单词" />
                <NavItem id="knowledge" icon={BookOpen} label="知识点" />
                <NavItem id="quiz" icon={CheckCircle} label="真题" />
                <NavItem id="message" icon={MessageCircle} label="留言" />
            </nav>
        </div>
    );
}

// 1. 首页/家长信
const HomeSection = () => {
    const [role, setRole] = useState('parent'); // 'parent' or 'student'

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Heart className="text-red-500 mr-2" fill="currentColor" size={20} />
                    老师的话
                </h2>
                
                <div className="flex space-x-2 mb-4 bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setRole('parent')}
                        className={`flex-1 py-2 text-sm rounded-md transition-all ${role === 'parent' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500'}`}
                    >
                        致家长
                    </button>
                    <button 
                        onClick={() => setRole('student')}
                        className={`flex-1 py-2 text-sm rounded-md transition-all ${role === 'student' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500'}`}
                    >
                        致孩子
                    </button>
                </div>

                <div className="prose prose-sm text-gray-600 leading-relaxed">
                    {role === 'parent' ? (
                        <>
                            <p className="mb-3"><span className="font-bold text-gray-800">亲爱的家长：</span></p>
                            <p className="mb-3">
                                咱们进入了赛考的备战期。我特意做了这个小网站，里面有我总结的英语单词和重难点知识。
                            </p>
                            <p className="mb-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <span className="text-blue-600 font-bold">📢 关于焦虑：</span><br/>
                                我想给您吃一颗定心丸。虽然是赛考，但只要跟着我认真复习，孩子绝对没问题！这个界面也是为了给孩子一个可视化的复习环境。
                            </p>
                            <p>
                                如果您没报名这次赛考也不要紧，知识学到手才是最重要的。这里也是重点知识的汇总，学扎实了，后面遇到什么比赛都能轻松应对！
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mb-3"><span className="font-bold text-gray-800">亲爱的同学：</span></p>
                            <p className="mb-3">
                                赛考冲刺开始啦！不要紧张，老师把所有的秘籍都放在这里了。
                            </p>
                            <p className="mb-3">
                                这里有单词的读音、知识点的讲解，还有真题演练。每天花10分钟刷一刷，咱们一定能拿高分！
                            </p>
                            <p className="font-bold text-blue-600">加油，我相信你！🚀</p>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-2">L1-1 学习进度</h3>
                <div className="flex items-center justify-between text-sm opacity-90 mb-1">
                    <span>本周目标</span>
                    <span>进行中</span>
                </div>
                <div className="w-full bg-blue-800/30 rounded-full h-2.5 mb-4">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/20 rounded-lg p-2">
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-xs">核心单词</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                        <div className="text-2xl font-bold">4</div>
                        <div className="text-xs">知识点</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-xs">真题</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. 单词部分
const VocabSection = ({ showToast }) => {
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            // 替换 alert()
            showToast("您的浏览器不支持语音朗读功能", "error"); 
        }
    };

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-800">L1-1 核心词汇</h2>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">点击喇叭播放</span>
            </div>
            
            <div className="grid gap-3">
                {vocabList.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100 hover:border-blue-300 transition-all">
                        <div className="flex-1">
                            <div className="flex items-baseline space-x-2">
                                <span className="text-xl font-bold text-blue-600 font-mono">{item.word}</span>
                                <span className="text-sm text-gray-400 font-mono">{item.phonetic}</span>
                            </div>
                            <div className="mt-1">
                                <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded mr-2">{item.type}</span>
                                <span className="text-gray-700 text-sm">{item.meaning}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => speak(item.word)}
                            className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                        >
                            <Music size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. 知识点部分
const KnowledgeSection = () => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-orange-800 font-bold mb-2 flex items-center">
                    <Star size={18} className="mr-2 fill-orange-500 text-orange-500" />
                    本课重难点 (背诵!)
                </h3>
                <ul className="space-y-2">
                    {keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start text-sm text-orange-900">
                            <span className="bg-orange-200 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 shrink-0 mt-0.5">{idx + 1}</span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">详细讲解</h2>
                <div className="space-y-4">
                    {knowledgePoints.map((kp, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="bg-gray-50 p-3 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">{kp.title}</h3>
                                <div className="flex space-x-1">
                                    {kp.tags.map(tag => (
                                        <span key={tag} className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{kp.content}</p>
                                
                                {/* 模拟语音播放条 */}
                                <div className="mt-4 bg-gray-100 rounded-full p-1 flex items-center max-w-[200px]">
                                    <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600">
                                        <Play size={14} fill="currentColor" />
                                    </button>
                                    <div className="flex-1 mx-3 h-1 bg-gray-300 rounded-full">
                                        <div className="w-1/3 h-full bg-blue-400 rounded-full"></div>
                                    </div>
                                    <span className="text-xs text-gray-500 mr-2">0:45</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 ml-1">点击听老师讲解</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 4. 习题部分
const QuizSection = () => {
    const [answers, setAnswers] = useState({}); // { questionId: selectedOptionId }
    const [showResult, setShowResult] = useState({}); // { questionId: boolean }

    const handleSelect = (qId, optionId) => {
        if (showResult[qId]) return; // Prevent changing after showing result
        setAnswers({ ...answers, [qId]: optionId });
    };

    const checkAnswer = (qId) => {
        if (!answers[qId]) return;
        setShowResult({ ...showResult, [qId]: true });
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <h2 className="font-bold text-blue-800">真题演练</h2>
                <p className="text-xs text-blue-600">请仔细阅读题目，这是赛考中常见的题型哦！</p>
            </div>

            {quizQuestions.map((q, idx) => {
                const isAnswered = showResult[q.id];
                const isCorrect = isAnswered && answers[q.id] === q.correct;

                return (
                    <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex space-x-2 mb-4">
                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded h-fit shrink-0">Q{idx + 1}</span>
                            {/* 使用 <pre> 标签显示代码段和换行，但使用 font-sans 确保字体一致 */}
                            <pre className="text-sm font-medium text-gray-800 whitespace-pre-wrap font-sans">{q.question}</pre>
                        </div>

                        <div className="space-y-2">
                            {q.options.map(opt => {
                                let btnClass = "w-full text-left p-3 rounded-lg border text-sm transition-all ";
                                if (isAnswered) {
                                    if (opt.id === q.correct) btnClass += "bg-green-50 border-green-500 text-green-700";
                                    else if (answers[q.id] === opt.id) btnClass += "bg-red-50 border-red-500 text-red-700";
                                    else btnClass += "bg-gray-50 border-gray-200 opacity-60";
                                } else {
                                    if (answers[q.id] === opt.id) btnClass += "bg-blue-50 border-blue-500 text-blue-700";
                                    else btnClass += "bg-white border-gray-200 hover:bg-gray-50";
                                }

                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleSelect(q.id, opt.id)}
                                        className={btnClass}
                                        disabled={isAnswered}
                                    >
                                        <span className="font-bold mr-2">{opt.id}.</span>
                                        {opt.text}
                                        {isAnswered && opt.id === q.correct && <CheckCircle className="inline ml-2 w-4 h-4 text-green-600 float-right" />}
                                        {isAnswered && answers[q.id] === opt.id && opt.id !== q.correct && <XCircle className="inline ml-2 w-4 h-4 text-red-600 float-right" />}
                                    </button>
                                );
                            })}
                        </div>

                        {!isAnswered ? (
                            <button
                                onClick={() => checkAnswer(q.id)}
                                disabled={!answers[q.id]}
                                className={`mt-4 w-full py-2 rounded-lg font-bold text-sm transition-all ${
                                    answers[q.id] ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                提交答案
                            </button>
                        ) : (
                            <div className={`mt-4 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                <p className="font-bold mb-1 flex items-center">
                                    {isCorrect ? <CheckCircle size={16} className="text-green-600 mr-1" /> : <XCircle size={16} className="text-red-600 mr-1" />}
                                    {isCorrect ? "🎉 回答正确！" : "🤔 再接再厉！"}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-bold">解析：</span>{q.explanation}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// 5. 留言板部分
const MessageSection = ({ showToast }) => {
    const [tab, setTab] = useState('question'); // 'question' or 'msg'
    const [input, setInput] = useState('');
    const [msgs, setMsgs] = useState([
        { id: 1, type: 'question', content: '老师，变量命名可以是中文吗？', reply: '可以但不推荐哦，最好用英文。' },
        { id: 2, type: 'msg', content: '老师我这次一定要拿奖！', reply: '老师相信你！加油！' }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMsg = {
            id: Date.now(),
            type: tab,
            content: input,
            reply: null // 模拟等待回复
        };
        setMsgs([newMsg, ...msgs]);
        setInput('');
        
        // 替换 alert()
        showToast("留言成功！老师看到后会回复哦~", "success");
    };

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button
                    onClick={() => setTab('question')}
                    className={`flex-1 py-2 text-sm rounded font-medium transition-all ${tab === 'question' ? 'bg-blue-100 text-blue-700 shadow-inner' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    ❓ 问题留言
                </button>
                <button
                    onClick={() => setTab('msg')}
                    className={`flex-1 py-2 text-sm rounded font-medium transition-all ${tab === 'msg' ? 'bg-pink-100 text-pink-700 shadow-inner' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    💬 给老师的话
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                    {tab === 'question' ? '这节课还有不明白的吗？' : '有什么悄悄话想对老师说？'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={tab === 'question' ? "老师，这里我不太懂..." : "老师，我想说..."}
                        className="w-full p-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 h-24 resize-none border border-gray-200"
                    ></textarea>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400 flex items-center">
                            <Lock size={12} className="mr-1" /> 仅老师可见 (当前为本地模拟)
                        </span>
                        <button type="submit" 
                                disabled={!input.trim()}
                                className={`px-4 py-2 rounded-lg text-sm flex items-center font-bold transition-colors ${input.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                            发送 <Send size={14} className="ml-1" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-3 pb-4">
                <h3 className="text-sm font-bold text-gray-500 ml-1 mt-6">我的留言记录 ({tab === 'question' ? '问题' : '留言'})</h3>
                {msgs.filter(m => m.type === tab).length === 0 && (
                    <div className="text-center text-gray-400 p-6 bg-white rounded-xl">暂无相关留言记录</div>
                )}
                {msgs.filter(m => m.type === tab).map(msg => (
                    <div key={msg.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start mb-2">
                            <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5 shrink-0">
                                <User size={14} className="text-blue-600" />
                            </div>
                            <p className="text-sm text-gray-800 break-words">{msg.content}</p>
                        </div>
                        {msg.reply && (
                            <div className="bg-yellow-50 p-2 rounded-lg ml-6 text-xs text-yellow-800 border border-yellow-100">
                                <span className="font-bold text-yellow-900 flex items-center mb-1">
                                    <BookOpen size={12} className="mr-1" /> 老师回复：
                                </span>
                                {msg.reply}
                            </div>
                        )}
                        {!msg.reply && (
                            <div className="ml-8 text-xs text-gray-400 italic flex items-center">
                                <Loader2 size={12} className="mr-1 animate-spin" />
                                等待老师回复中...
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};