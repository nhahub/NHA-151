import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

function TermsOfService({ isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-md"
        onInteractOutside={() => setIsOpen(false)}
      >
        <DialogClose onClick={() => setIsOpen(false)} />
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Welcome to <strong>Greenify</strong> — your trusted online plant
                store.
              </p>
              <p>
                By using our website, you agree to use it responsibly and for
                personal purposes only.
              </p>
              <p>
                Orders are processed with care, and we do our best to deliver
                healthy plants. However, some variation in size or color may
                occur.
              </p>
              <p>
                Please contact us at <strong>support@greenify.com</strong> if
                you have any issues with your order.
              </p>
              <p>Thank you for growing green with us!</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default TermsOfService;
