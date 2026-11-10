export default function PreviewMotionGuard() {
  return (
    <style>{`
      html body .landing-preview .landing-nav *,
      html body .landing-preview #home *,
      html body .landing-preview #about *,
      html body .landing-preview #classes *,
      html body .landing-preview #locations *,
      html body .landing-preview #performances *,
      html body .landing-preview #shop *,
      html body .landing-preview #contact *,
      html body .landing-preview #registration *,
      html body .landing-preview .landing-footer *,
      html body .preview-action-button,
      html body .preview-back-top {
        border-radius: 0 !important;
      }
    `}</style>
  );
}
