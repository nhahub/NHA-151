import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

function PrivacyPolicy({ isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-md"
        onInteractOutside={() => setIsOpen(false)}
      >
        <DialogClose onClick={() => setIsOpen(false)} />
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>

          {/* الحل: استخدمي DialogDescription مع asChild */}
          <DialogDescription asChild>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                At <strong>Greenify</strong>, your privacy is very important to
                us. We are committed to protecting your personal information and
                ensuring that your experience with us is safe and secure.
              </p>
              <p>
                We only collect information that is necessary to process your
                orders, improve our services, and provide you with a better
                shopping experience.
              </p>
              <p>
                Your information will <strong>never be sold or shared</strong>{" "}
                with third parties except as required to complete your order
                (such as delivery services).
              </p>
              <p>
                We may use cookies to enhance your browsing experience, analyze
                site traffic, and personalize content.
              </p>
              <p>
                If you have any questions about how we handle your data, please
                contact us at <strong>privacy@greenify.com</strong>.
              </p>
              <p>Thank you for trusting Greenify 🌿</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PrivacyPolicy;
