"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  MessageCircle,
  Youtube,
  Image as ImageIcon,
  Phone,
  MessageSquare,
  Compass,
  Settings,
  ChevronLeft,
  Send,
  Wifi,
  Battery,
  Lock,
  Plus,
  X,
  Search,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Info,
  Clock,
  MicOff,
  Volume2,
  Grid,
  UserPlus,
  Video,
  Users,
  PhoneOff,
  RotateCw,
  TrendingUp
} from "lucide-react";

export default function MobilePhoneSimulator() {
  // 화면 모드: "lock" | "home" | "calendar" | "kakaotalk" | "call" | "browser" | "calling"
  const [currentScreen, setCurrentScreen] = useState<
    "lock" | "home" | "calendar" | "kakaotalk" | "call" | "browser" | "calling"
  >("lock");

  // 잠금화면 해제 시 상단 푸시 알림 배너 표시 여부
  const [showNewPush, setShowNewPush] = useState(false);

  // --- 인터넷 브라우저 관련 상태 ---
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [browserKeyword, setBrowserKeyword] = useState("");
  const searchHistory = [
    "남친대행",
    "직장동료 축의금",
    "전남친 축의금",
    "전남친 결혼식",
  ];

  // --- 통화 발신/통화 중 관련 상태 ---
  const [callingContact, setCallingContact] = useState<string>("");
  const [callStatus, setCallStatus] = useState<"connecting" | "active">("connecting");
  const [callSeconds, setCallSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  // 통화 연결 타이머
  useEffect(() => {
    let connectTimer: NodeJS.Timeout;
    let callTimer: NodeJS.Timeout;

    if (currentScreen === "calling") {
      setCallStatus("connecting");
      setCallSeconds(0);

      connectTimer = setTimeout(() => {
        setCallStatus("active");
      }, 2500);

      callTimer = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(connectTimer);
      clearInterval(callTimer);
    };
  }, [currentScreen]);

  // 잠금화면 해제 시 '보러 가도 돼?' 푸시 배너 트리거
  const handleUnlock = () => {
    setCurrentScreen("home");
    setShowNewPush(true);
  };

  const startCall = (name: string) => {
    setCallingContact(name);
    setCurrentScreen("calling");
  };

  const endCall = () => {
    setCurrentScreen("call");
    setCallStatus("connecting");
    setCallSeconds(0);
  };

  const formatCallTime = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // --- 캘린더 상태 ---
  const [events, setEvents] = useState<{ [day: number]: string[] }>({
    24: ["성찬"],
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(24);
  const [scheduleInput, setScheduleInput] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);

  // --- 통화 내역 데이터 (성찬이♥ 발신 시간: 09:13 수정 완료) ---
  const callLogs = [
    { name: "성찬이♥", type: "missed", date: "오늘 09:13" },
    { name: "010-0913-0319", type: "incoming", date: "어제" },
    { name: "02-6078-1600", type: "missed", date: "어제" },
    { name: "동생", type: "incoming", date: "10월 16일" },
    { name: "070-4198-3522", type: "missed", date: "10월 16일" },
    { name: "070-4189-3132", type: "missed", date: "10월 15일" },
    { name: "02-6124-1600", type: "missed", date: "10월 14일" },
    { name: "권영민", type: "incoming", date: "10월 13일" },
    { name: "02-6078-1600", type: "missed", date: "10월 12일" },
    { name: "권영민", type: "outgoing", date: "10월 11일" },
    { name: "권영민", type: "outgoing", date: "10월 10일" },
  ];

  // --- 카카오톡 메시지 상태 (마지막 답장 '응' 제거 완료) ---
  const initialMessages = [
    { id: 1, sender: "성찬", text: "토요일 점심", time: "12:15" },
    { id: 2, sender: "성찬", text: "데리러 올 테니까 잊지 마", time: "12:15" },
    { id: 3, sender: "은석", text: "ㅇㅇ", time: "12:18" },
    { id: 4, sender: "성찬", text: "뭐해?", time: "14:40" },
    { id: 5, sender: "은석", text: "티비", time: "14:45" },
    { id: 6, sender: "성찬", text: "밥 먹었어?", time: "14:46" },
    { id: 7, sender: "은석", text: "ㅇㅇ", time: "14:46" },
    { id: 8, sender: "성찬", text: "보고 싶어", time: "21:13" },
    { id: 9, sender: "성찬", text: "보러 가도 돼?", time: "21:13" },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleAddEvent = () => {
    if (!selectedDay || !scheduleInput.trim()) return;
    setEvents((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), scheduleInput.trim()],
    }));
    setScheduleInput("");
    setIsInputOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "은석", text: inputMessage.trim(), time: timeStr },
    ]);
    setInputMessage("");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 font-sans antialiased text-zinc-900 select-none">
      {/* 폰 외곽 프레임 (390x844px) */}
      <div className="relative h-[844px] w-[390px] overflow-hidden rounded-[52px] border-[10px] border-zinc-800 bg-black shadow-2xl ring-1 ring-zinc-700/50">
        
        {/* 상단 다이내믹 아일랜드 */}
        <div className="absolute left-1/2 top-3 z-50 h-7 w-28 -translate-x-1/2 rounded-full bg-black shadow-inner"></div>

        {/* 상단 상태 표시줄 (21:13) */}
        <div className={`absolute left-0 top-0 z-40 flex w-full items-center justify-between px-7 pt-3 text-xs font-semibold ${
          currentScreen === "lock" || currentScreen === "home" || currentScreen === "calling"
            ? "text-white"
            : "text-zinc-800"
        }`}>
          <span>21:13</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        {/* ========================================================
            1. 잠금화면 (부재중 시간: 09:13)
        ======================================================== */}
        {currentScreen === "lock" && (
          <div 
            onClick={handleUnlock}
            className="flex h-full w-full cursor-pointer flex-col justify-between bg-gradient-to-b from-slate-900 via-indigo-950 to-zinc-900 px-6 pb-12 pt-16 text-white transition-all duration-300"
          >
            <div className="flex flex-col items-center mt-8">
              <Lock className="h-5 w-5 mb-3 opacity-70" />
              <p className="text-sm font-medium tracking-wide text-zinc-300">
                2026년 10월 18일 일요일
              </p>
              <h1 className="mt-1 text-7xl font-extralight tracking-tight">21:13</h1>
            </div>

            <div className="space-y-2">
              <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FEE500] text-[10px] font-bold text-black">💬</span>
                  <span className="text-xs font-semibold text-zinc-200">성찬이♥</span>
                  <span className="text-[10px] text-zinc-400 ml-auto">지금</span>
                </div>
                <p className="text-xs text-zinc-100 font-medium">보고 싶어</p>
              </div>

              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  startCall("성찬이♥");
                }}
                className="rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/10 shadow-lg hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-500 text-[10px] text-white">📞</span>
                  <span className="text-xs font-semibold text-red-300">부재중 전화</span>
                  <span className="text-[10px] text-zinc-400 ml-auto">09:13</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">성찬이♥</p>
              </div>
            </div>

            <div className="text-center animate-bounce text-xs font-light tracking-wider text-zinc-400">
              화면을 터치하여 잠금 해제
            </div>
          </div>
        )}

        {/* ========================================================
            2. 바탕화면 (잠금 해제 시 '보러 가도 돼?' 푸시 배너)
        ======================================================== */}
        {currentScreen === "home" && (
          <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-slate-800 via-zinc-900 to-stone-900 px-6 pb-6 pt-14 text-white">
            
            {showNewPush && (
              <div 
                onClick={() => {
                  setShowNewPush(false);
                  setCurrentScreen("kakaotalk");
                }}
                className="absolute top-12 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300 cursor-pointer rounded-2xl bg-white/95 p-3.5 text-zinc-900 shadow-2xl backdrop-blur-md border border-white/40"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FEE500] text-[10px] font-bold text-black">💬</span>
                  <span className="text-xs font-bold text-zinc-900">성찬이♥</span>
                  <span className="text-[10px] text-zinc-500 ml-auto">지금</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNewPush(false);
                    }}
                    className="text-zinc-400 hover:text-zinc-700 ml-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-zinc-800 font-semibold pl-7">보러 가도 돼?</p>
              </div>
            )}

            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm font-medium text-zinc-300">2026년 10월 18일 일요일</p>
              <h1 className="text-6xl font-light tracking-tight">21:13</h1>
            </div>

            <div className="grid grid-cols-4 gap-4 px-2 my-auto">
              <button
                onClick={() => setCurrentScreen("calendar")}
                className="group flex flex-col items-center gap-1.5 focus:outline-none"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform active:scale-90">
                  <CalendarIcon className="h-7 w-7 text-red-500" />
                </div>
                <span className="text-xs font-normal text-zinc-200">캘린더</span>
              </button>

              <button
                onClick={() => setCurrentScreen("kakaotalk")}
                className="group flex flex-col items-center gap-1.5 focus:outline-none"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEE500] shadow-lg transition-transform active:scale-90">
                  <MessageCircle className="h-7 w-7 text-[#191919] fill-[#191919]" />
                  {showNewPush && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      1
                    </span>
                  )}
                </div>
                <span className="text-xs font-normal text-zinc-200">카카오톡</span>
              </button>

              <div className="flex flex-col items-center gap-1.5 opacity-80">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg">
                  <Youtube className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-normal text-zinc-200">유튜브</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 opacity-80">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 shadow-lg">
                  <ImageIcon className="h-7 w-7 text-white" />
                </div>
                <span className="text-xs font-normal text-zinc-200">갤러리</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-3 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setCurrentScreen("call")}
                  className="flex flex-col items-center focus:outline-none"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 shadow-md transition-transform active:scale-90">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                </button>

                <div className="flex flex-col items-center opacity-80">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 shadow-md">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    setCurrentScreen("browser");
                  }}
                  className="flex flex-col items-center focus:outline-none"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 shadow-md transition-transform active:scale-90">
                    <Compass className="h-6 w-6 text-white" />
                  </div>
                </button>

                <div className="flex flex-col items-center opacity-80">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-600 shadow-md">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            3. 통화 앱 (성찬이♥ 09:13)
        ======================================================== */}
        {currentScreen === "call" && (
          <div className="flex h-full w-full flex-col bg-white pt-12 pb-6">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 pb-3">
              <button 
                onClick={() => setCurrentScreen("home")} 
                className="flex items-center text-xs font-medium text-emerald-600 active:opacity-60"
              >
                <ChevronLeft className="h-4 w-4" /> 바탕화면
              </button>
              <h2 className="text-base font-bold text-zinc-900">최근 기록</h2>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 active:scale-95">
                <Search className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 divide-y divide-zinc-100">
              {callLogs.map((log, index) => {
                const isMissed = log.type === "missed";
                return (
                  <div
                    key={index}
                    onClick={() => startCall(log.name)}
                    className="flex items-center justify-between py-3 cursor-pointer transition-colors active:bg-zinc-50 hover:bg-zinc-50/70 rounded-xl px-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50">
                        {log.type === "incoming" && <PhoneIncoming className="h-4 w-4 text-emerald-500" />}
                        {log.type === "outgoing" && <PhoneOutgoing className="h-4 w-4 text-zinc-400" />}
                        {log.type === "missed" && <PhoneMissed className="h-4 w-4 text-red-500" />}
                      </div>

                      <div>
                        <p className={`text-sm font-semibold tracking-tight ${isMissed ? "text-red-500" : "text-zinc-800"}`}>
                          {log.name}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          {log.type === "missed" ? "부재중 전화" : log.type === "incoming" ? "수신 전화" : "발신 전화"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400">{log.date}</span>
                      <Info className="h-4 w-4 text-zinc-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            3-1. 발신/통화 중 화면
        ======================================================== */}
        {currentScreen === "calling" && (
          <div className="flex h-full w-full flex-col justify-between bg-gradient-to-b from-zinc-900 via-stone-900 to-black px-8 pb-14 pt-20 text-white">
            <div className="flex flex-col items-center mt-4">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800/90 text-3xl font-light shadow-xl ring-2 ring-white/10">
                {callingContact === "성찬이♥" ? "♥" : callingContact.slice(0, 1)}
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                {callingContact}
              </h1>
              
              <p className="text-sm font-normal text-zinc-400">
                {callStatus === "connecting" ? (
                  <span className="animate-pulse">연결 중...</span>
                ) : (
                  formatCallTime(callSeconds)
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-y-6 gap-x-4 my-auto px-2">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex h-16 w-16 items-center justify-center rounded-full transition-all active:scale-95 ${
                    isMuted ? "bg-white text-zinc-900" : "bg-white/10 text-white backdrop-blur-md"
                  }`}
                >
                  <MicOff className="h-6 w-6" />
                </button>
                <span className="text-[11px] text-zinc-300">소리 차단</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md active:scale-95">
                  <Grid className="h-6 w-6" />
                </button>
                <span className="text-[11px] text-zinc-300">키패드</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setIsSpeaker(!isSpeaker)}
                  className={`flex h-16 w-16 items-center justify-center rounded-full transition-all active:scale-95 ${
                    isSpeaker ? "bg-white text-zinc-900" : "bg-white/10 text-white backdrop-blur-md"
                  }`}
                >
                  <Volume2 className="h-6 w-6" />
                </button>
                <span className="text-[11px] text-zinc-300">스피커</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md active:scale-95">
                  <UserPlus className="h-6 w-6" />
                </button>
                <span className="text-[11px] text-zinc-300">통화 추가</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md active:scale-95">
                  <Video className="h-6 w-6" />
                </button>
                <span className="text-[11px] text-zinc-300">영상통화</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md active:scale-95">
                  <Users className="h-6 w-6" />
                </button>
                <span className="text-[11px] text-zinc-300">연락처</span>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={endCall}
                className="flex h-18 w-18 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform active:scale-90 hover:bg-red-700"
              >
                <PhoneOff className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            4. 인터넷 브라우저 (날씨 주소: 서울시 강남구 고정)
        ======================================================== */}
        {currentScreen === "browser" && (
          <div className="flex h-full w-full flex-col bg-[#F5F6F8] pt-12 pb-6">
            <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 pb-2.5">
              <button 
                onClick={() => {
                  setIsSearchActive(false);
                  setCurrentScreen("home");
                }} 
                className="flex items-center text-xs font-medium text-zinc-600 active:opacity-60"
              >
                <ChevronLeft className="h-4 w-4" /> 홈
              </button>
              <div className="flex items-center rounded-full bg-zinc-100 px-4 py-1.5 text-xs text-zinc-700 font-medium">
                <span className="text-[10px] text-zinc-400 mr-1.5">🔒</span>
                naver.com
              </div>
              <button 
                onClick={() => setIsSearchActive(false)} 
                className="text-zinc-500 hover:text-zinc-800"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white px-4 pt-3 pb-3.5 shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-2xl font-black text-[#03C75A] tracking-tighter">NAVER</span>
                {isSearchActive && (
                  <button 
                    onClick={() => setIsSearchActive(false)}
                    className="text-xs font-medium text-zinc-500 hover:text-zinc-800"
                  >
                    취소
                  </button>
                )}
              </div>

              <div 
                onClick={() => setIsSearchActive(true)}
                className={`flex items-center rounded-full border-2 bg-white px-3.5 py-2 transition-all cursor-pointer ${
                  isSearchActive ? "border-[#03C75A] ring-2 ring-[#03C75A]/20" : "border-[#03C75A]"
                }`}
              >
                <Search className="h-4 w-4 text-[#03C75A] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="검색어를 입력해 주세요"
                  value={browserKeyword}
                  onFocus={() => setIsSearchActive(true)}
                  onChange={(e) => setBrowserKeyword(e.target.value)}
                  className="w-full text-xs text-zinc-800 outline-none bg-transparent"
                />
                {isSearchActive && browserKeyword && (
                  <button onClick={() => setBrowserKeyword("")}>
                    <X className="h-3.5 w-3.5 text-zinc-400" />
                  </button>
                )}
              </div>
            </div>

            {isSearchActive ? (
              <div className="flex-1 bg-white p-4 shadow-sm animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <span className="text-xs font-bold text-zinc-800">최근 검색어</span>
                  <span className="text-[11px] text-zinc-400 hover:text-zinc-600 cursor-pointer">
                    전체삭제
                  </span>
                </div>

                <div className="divide-y divide-zinc-100">
                  {searchHistory.map((query, index) => (
                    <div 
                      key={index} 
                      onClick={() => setBrowserKeyword(query)}
                      className="flex items-center justify-between py-3 cursor-pointer hover:bg-zinc-50 px-1 rounded-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="text-xs text-zinc-800 font-medium">{query}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <X className="h-3.5 w-3.5 text-zinc-300 hover:text-zinc-500" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 mb-2">
                    <TrendingUp className="h-3.5 w-3.5 text-[#03C75A]" />
                    <span>실시간 급상승 키워드</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-600">주말 날씨</span>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-600">결혼식 하객룩</span>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-600">단풍 명소</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                <div className="grid grid-cols-5 gap-2 rounded-2xl bg-white p-3 text-center shadow-xs">
                  {["메일", "카페", "블로그", "쇼핑", "뉴스"].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-50 text-[11px] font-bold text-zinc-700">
                        {item.slice(0, 1)}
                      </div>
                      <span className="text-[10px] text-zinc-600">{item}</span>
                    </div>
                  ))}
                </div>

                {/* 서울시 강남구 날씨 카드 */}
                <div className="rounded-2xl bg-white p-3.5 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-zinc-400">서울시 강남구</p>
                    <p className="text-base font-bold text-zinc-800">15.4°C <span className="text-xs font-normal text-zinc-500">맑음</span></p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-[#03C75A]">
                    미세먼지 좋음
                  </span>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100">
                    <span className="text-xs font-bold text-zinc-800">주요 뉴스</span>
                    <span className="text-[10px] text-zinc-400">10.18 21:13 기준</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    <li className="truncate hover:text-[#03C75A]">• 가을철 쌀쌀한 밤 기온... 내일 낮부터 평년 기온 회복</li>
                    <li className="truncate hover:text-[#03C75A]">• 10월 본격 결혼 성수기, 축의금 부담 트렌드 분석</li>
                    <li className="truncate hover:text-[#03C75A]">• 주말 나들이 명소 및 귀경길 교통 상황 안내</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            5. 캘린더 화면
        ======================================================== */}
        {currentScreen === "calendar" && (
          <div className="flex h-full w-full flex-col bg-white pt-12 pb-6">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 pb-3">
              <button 
                onClick={() => setCurrentScreen("home")} 
                className="flex items-center text-xs font-medium text-red-500 active:opacity-60"
              >
                <ChevronLeft className="h-4 w-4" /> 바탕화면
              </button>
              <h2 className="text-base font-semibold text-zinc-800">2026년 10월</h2>
              <button 
                onClick={() => setIsInputOpen(true)}
                className="text-red-500 active:scale-95"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium text-zinc-400">
                <span className="text-red-500">일</span>
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span>토</span>
              </div>

              <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
                <span /><span /><span /><span />

                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isCurrentDay = day === 18;
                  const hasEvents = events[day] && events[day].length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDay(day);
                        setIsInputOpen(true);
                      }}
                      className={`relative flex h-10 w-full flex-col items-center justify-center rounded-xl text-xs transition-colors ${
                        isCurrentDay ? "bg-red-50 font-bold text-red-600 ring-1 ring-red-400" : ""
                      } ${selectedDay === day ? "bg-zinc-100" : ""} hover:bg-zinc-50`}
                    >
                      <span>{day}</span>
                      {hasEvents && (
                        <span className="mt-0.5 max-w-[36px] truncate rounded bg-red-100 px-1 text-[9px] font-semibold text-red-600">
                          {events[day][0]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 border-t border-zinc-100 bg-zinc-50/60 p-4">
              <p className="text-xs font-semibold text-zinc-500 mb-2">
                {selectedDay ? `10월 ${selectedDay}일 일정` : "날짜를 선택하세요"}
              </p>

              {selectedDay && events[selectedDay] && events[selectedDay].length > 0 ? (
                <div className="space-y-2">
                  {events[selectedDay].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 rounded-xl bg-white p-3.5 shadow-sm border border-zinc-100">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-zinc-800">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-400">등록된 일정이 없습니다.</p>
              )}
            </div>

            {isInputOpen && (
              <div className="absolute inset-x-4 bottom-14 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-700">
                    10월 {selectedDay}일 일정 추가
                  </span>
                  <button onClick={() => setIsInputOpen(false)}>
                    <X className="h-4 w-4 text-zinc-400" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="일정을 입력하세요"
                  value={scheduleInput}
                  onChange={(e) => setScheduleInput(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-red-500"
                  autoFocus
                />
                <button
                  onClick={handleAddEvent}
                  className="mt-2.5 w-full rounded-xl bg-red-500 py-2 text-xs font-semibold text-white shadow-md active:bg-red-600"
                >
                  저장
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            6. 카카오톡 화면 (마지막 답장 '응' 제거 완료)
        ======================================================== */}
        {currentScreen === "kakaotalk" && (
          <div className="flex h-full w-full flex-col bg-[#BACEE0] pt-12 pb-4">
            <div className="flex items-center justify-between border-b border-black/5 bg-[#BACEE0] px-4 pb-2.5">
              <button 
                onClick={() => setCurrentScreen("home")} 
                className="flex items-center text-xs font-medium text-zinc-800 active:opacity-60"
              >
                <ChevronLeft className="h-5 w-5" /> 바탕화면
              </button>
              <div className="text-center">
                <h2 className="text-sm font-bold text-zinc-800">성찬이♥</h2>
              </div>
              <div className="w-10" />
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <div className="my-2 text-center">
                <span className="rounded-full bg-black/10 px-3 py-1 text-[10px] font-medium text-zinc-600">
                  2026년 10월 18일 일요일
                </span>
              </div>

              {messages.map((msg, index) => {
                const isEunseok = msg.sender === "은석";
                const showSenderHeader = !isEunseok && (index === 0 || messages[index - 1].sender !== "성찬");

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isEunseok ? "items-end" : "items-start"}`}
                  >
                    {showSenderHeader && (
                      <span className="ml-9 mb-1 text-[11px] font-semibold text-zinc-700">
                        성찬이♥
                      </span>
                    )}

                    <div className={`flex items-end gap-1.5 ${isEunseok ? "flex-row-reverse" : "flex-row"}`}>
                      {/* 성찬 프로필: 검은색 단색 이미지 */}
                      {!isEunseok ? (
                        showSenderHeader ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black shadow-sm ring-1 ring-black/20" />
                        ) : (
                          <div className="w-8" />
                        )
                      ) : null}

                      <div
                        className={`max-w-[210px] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${
                          isEunseok
                            ? "rounded-tr-none bg-[#FEE500] text-zinc-900"
                            : "rounded-tl-none bg-white text-zinc-900"
                        }`}
                      >
                        {msg.text}
                      </div>

                      <span className="text-[10px] text-zinc-500 mb-0.5">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 은석의 답장 입력창 (직접 '응' 등의 답장을 전송해볼 수 있습니다) */}
            <div className="mx-3 mt-1 flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="답장을 입력하세요..."
                className="flex-1 bg-transparent px-2 text-xs outline-none text-zinc-800"
              />
              <button
                onClick={handleSendMessage}
                className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#FEE500] text-zinc-900 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 하단 홈 바 */}
        <div
          onClick={() => {
            if (currentScreen === "calling") endCall();
            else {
              setIsSearchActive(false);
              setCurrentScreen("home");
            }
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 cursor-pointer rounded-full bg-zinc-400/80 transition-opacity hover:opacity-100 z-50"
        />
      </div>
    </main>
  );
}