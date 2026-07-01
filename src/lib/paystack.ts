declare global {
  interface Window {
    PaystackPop: {
      setup(config: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }): { openIframe(): void };
    };
  }
}

export function openPaystackPopup(opts: {
  email: string;
  amount: number;
  onSuccess: () => void;
  onClose?: () => void;
}) {
  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";
  if (!key || !opts.email) return;

  const handler = window.PaystackPop.setup({
    key,
    email: opts.email,
    amount: Math.round(opts.amount * 100),
    currency: "NGN",
    callback() {
      opts.onSuccess();
    },
    onClose() {
      opts.onClose?.();
    },
  });

  handler.openIframe();
}
