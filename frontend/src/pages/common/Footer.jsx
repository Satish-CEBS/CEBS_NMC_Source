import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Footer = () => {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (chatOpen) {
      // Load DocsBot iframe when opened
      const existingIframe = document.getElementById("docsbotai-iframe");
      if (!existingIframe) {
        const iframe = document.createElement("iframe");
        iframe.src =
          "https://docsbot.ai/iframe/KhRF8F5KH2P0HlN7RW97/4EZqJ7PPGv0XpAhkDkd8";
        iframe.width = "400";
        iframe.height = "500";
        iframe.id = "docsbotai-iframe";
        iframe.frameBorder = "0";
        iframe.allowTransparency = "true";
        iframe.scrolling = "no";
        iframe.style.borderRadius = "12px";
        iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        document.getElementById("floating-ai-container")?.appendChild(iframe);
      }
    }
  }, [chatOpen]);

  const closeChat = () => {
    const el = document.getElementById("floating-ai-container");
    if (el) el.innerHTML = "";
    setChatOpen(false);
  };

  return (
    <>
      <footer className="cebs-footer">
        <Typography variant="body2">
          <span className="cebs-highlight">&copy;2025 CEBS Worldwide</span>. All
          rights reserved. Unauthorized use is prohibited.
        </Typography>
        <Typography variant="caption" component="div" className="cebs-tagline">
          Empowering global trade through innovative solutions
        </Typography>
      </footer>

      {/* Floating AI Button */}
      {!chatOpen && (
        <button
          className="floating-ai-button"
          onClick={() => setChatOpen(true)}
        >
          <ChatBubbleOutlineIcon /> Ask AI
        </button>
      )}

      {/* Floating AI Chat */}
      {chatOpen && (
        <div className="floating-ai-window" id="floating-ai-container">
          <button className="ai-close-button" onClick={closeChat}>
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default Footer;
