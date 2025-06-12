/**
 * Function to handle smooth scrolling to a section of the page.
 * @param e - The click event from the anchor element.
 * @returns void
 */
export const handleScrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>
) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href")?.slice(1);
  if (!targetId) return;

  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
