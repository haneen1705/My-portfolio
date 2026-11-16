import { site } from "@/data/site";

export function TalkButton() {
  return (
    <a
      className="talk"
      href={site.email ? `mailto:${site.email}` : "#contact"}
      aria-label="Let’s talk about your project"
    >
      <svg className="talk-ring" viewBox="0 0 104 104" aria-hidden="true">
        <defs>
          <path
            id="talk-circle"
            d="M52,52 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
          />
        </defs>
        <text textLength="269" lengthAdjust="spacing">
          <textPath href="#talk-circle">
            Have a project? ~{" "}
            <tspan fill="#b4df12" fontWeight="700">
              Let’s Talk
            </tspan>{" "}
            ~{" "}
          </textPath>
        </text>
      </svg>
      <span className="talk-center">
        <img src="/assets/7bd96.svg" width="35" height="35" alt="" />
      </span>
    </a>
  );
}
