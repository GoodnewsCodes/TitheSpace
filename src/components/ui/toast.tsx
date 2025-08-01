import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#fff",
          color: "#363636",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        },
        success: {
          style: {
            border: "1px solid #10b981",
          },
        },
        error: {
          style: {
            border: "1px solid #ef4444",
          },
        },
      }}
    />
  )
}
