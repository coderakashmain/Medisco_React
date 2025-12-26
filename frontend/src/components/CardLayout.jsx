import React from "react";
import logo from "../assets/img/logo-white.png";
import { useQrcode } from "../Context/QrCodeProvider";
import { useScreen } from "../Context/ScreenProvider";

const CardLayout = () => {
  const { qrCode } = useQrcode();
  const { isMobile, width } = useScreen();

  const formattedCardNumber = qrCode?.data?.card_no
    ?.replace(/\D/g, "")
    ?.replace(/(.{4})/g, "$1 ")
    ?.trim();

  const cardWidth =
    width < 370 ? "100%" : isMobile ? "100%" : "420px";
  const cardHeight =
    width < 370 ? "auto" : isMobile ? "230px" : "260px";

  return (
    <>
      {qrCode?.data?.card_no ? (
        <div
          style={{
            width: cardWidth,
            height: cardHeight,
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, var(--color-primary), #1e3a8a)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
          className="select-none flex flex-col"
        >
          {/* Top Section */}
          <div
            style={{ height: "28%", padding: "16px 18px" }}
            className="flex justify-between items-center"
          >
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              style={{ width: isMobile ? "100px" : "120px" }}
            />

            <div style={{ color: "#fff", textAlign: "right" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                }}
              >
                Medisco.in
              </div>
              <div
                style={{
                  fontSize: "11px",
                  opacity: 0.85,
                }}
              >
                Privilege Card
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div
            style={{
              height: "44%",
              background: "#F4F4FF",
              padding: "18px",
            }}
            className="flex justify-between items-center"
          >
            {/* Left */}
            <div className="flex flex-col justify-between h-full">
              <div
                style={{
                  fontSize: isMobile ? "16px" : "20px",
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                }}
              >
                {formattedCardNumber}
              </div>

              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {qrCode?.data?.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#555",
                    marginTop: "2px",
                  }}
                >
                  Valid Till :{" "}
                  {qrCode?.data?.validity || "Oct 2026"}
                </div>
              </div>
            </div>

            {/* QR */}
            <div
              style={{
                background: "#fff",
                padding: "8px",
                borderRadius: "10px",
              }}
            >
              <img
                src={qrCode?.data?.qrcode}
                alt="QR Code"
                style={{
                  width: isMobile ? "80px" : "96px",
                  height: isMobile ? "80px" : "96px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              height: "28%",
              color: "#fff",
              padding: "10px 14px",
              textAlign: "center",
            }}
            className="flex flex-col justify-center"
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Near Unitech computer training centre, Rayagada, Odisha
            </div>
            <div
              style={{
                fontSize: "10px",
                opacity: 0.9,
                marginTop: "3px",
              }}
            >
              +91 9437234628 | medisco.in@gmail.com
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No card available.
        </p>
      )}
    </>
  );
};

export default CardLayout;
