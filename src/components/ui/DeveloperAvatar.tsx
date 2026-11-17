import type { SVGProps } from 'react'

/**
 * Self-contained palette and `av-*` animations, copied from `public/developer-avatar.svg`.
 * Only change from the file: the `svg` / `*` selectors are scoped to `.badge-av`, because an
 * inline `<style>` in an HTML page applies to the whole document, not just this SVG.
 */
const svgCss = `
  /* Palette (same as the portfolio tokens) so the file renders on its own */
  .badge-av { --bg:#0A0B0D; --s1:#0E0F12; --s2:#121418; --s3:#15171B; --ln2:#23262D; --ln3:#2E323A; --ln4:#3A3F48;
        --tx:#EDEBE6; --tx2:#D6D4CF; --tx3:#B4B7BE; --ac:#C8F169; --ac2:#E2FF9E; --hp:#8E929B; --hp-deep:#2E323A; --mug:#1E3A5F; --mug-edge:#2F5A8C; }
  @keyframes avBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
  @keyframes avGlint{0%,75%{opacity:0;transform:translateX(-6px)}85%{opacity:1}100%{opacity:0;transform:translateX(6px)}}
  @keyframes avGlow{0%,100%{opacity:.6}50%{opacity:1}}
  @keyframes avRise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-60px);opacity:0}}
  @keyframes avSteam{0%{transform:translateY(0);opacity:0}30%{opacity:.8}100%{transform:translateY(-12px);opacity:0}}
  @keyframes avLid{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes avArm{0%,100%{transform:translateY(0)}50%{transform:translateY(1.6px)}}
  @keyframes avTap{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-2.4px) rotate(-6deg)}55%{transform:translateY(.4px) rotate(2deg)}}
  @keyframes avPlant{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
  @keyframes avSpin{to{transform:rotate(360deg)}}
  .av-eye{transform-box:fill-box;transform-origin:center;animation:avBlink 5s ease-in-out infinite}
  .av-glint{animation:avGlint 4.5s ease-in-out infinite}
  .av-screenglow{animation:avGlow 3s ease-in-out infinite}
  .av-orbit{transform-box:fill-box;transform-origin:center;animation:avSpin 40s linear infinite}
  .av-rise{animation:avRise 4.2s ease-out infinite}
  .av-steam{animation:avSteam 2.6s ease-out infinite}
  .av-lidglow{animation:avLid 2.4s ease-in-out infinite;filter:drop-shadow(0 0 4px #C8F169)}
  .av-arm{animation:avArm .5s ease-in-out infinite}
  .av-tap{transform-box:fill-box;transform-origin:50% 100%;animation:avTap .42s ease-in-out infinite}
  .av-plant{transform-box:fill-box;transform-origin:50% 100%;animation:avPlant 4.5s ease-in-out infinite}
  @media (prefers-reduced-motion: reduce){ .badge-av *{animation:none !important} }
`

/** Animated developer-at-laptop illustration for the ID badge. Decorative. */
export function DeveloperAvatar({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 200"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      className={['badge-av', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <style>{svgCss}</style>
      {/* halo */}
      <circle
        cx="110"
        cy="86"
        r="66"
        style={{ fill: 'color-mix(in srgb, var(--ac) 9%, transparent)' }}
      />
      <circle
        className="av-orbit"
        cx="110"
        cy="86"
        r="78"
        style={{ fill: 'none', stroke: 'var(--ln3)', strokeWidth: '1', strokeDasharray: '3 7' }}
      />
      {/* code rising out of the laptop */}
      <g className="av-rise" style={{ animationDelay: '0s' }}>
        <text
          x="70"
          y="112"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fill: 'var(--ac)' }}
        >
          {'</>'}
        </text>
      </g>
      <g className="av-rise" style={{ animationDelay: '-1.2s' }}>
        <text
          x="132"
          y="110"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fill: 'var(--tx3)',
          }}
        >
          {'{ }'}
        </text>
      </g>
      <g className="av-rise" style={{ animationDelay: '-2.4s' }}>
        <text
          x="152"
          y="116"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fill: 'var(--ac)' }}
        >
          {'=>'}
        </text>
      </g>
      <g className="av-rise" style={{ animationDelay: '-3.3s' }}>
        <text
          x="46"
          y="118"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fill: 'var(--tx3)' }}
        >
          npm
        </text>
      </g>
      {/* body / hoodie with shoulders */}
      <path
        d="M50 188c0-30 10-52 30-62 9-4 19-6 30-6s21 2 30 6c20 10 30 32 30 62z"
        style={{ fill: '#1C2026', stroke: 'var(--ln4)', strokeWidth: '1.5' }}
      />
      <path
        d="M78 128c-6 10-8 22-8 34M142 128c6 10 8 22 8 34"
        style={{ fill: 'none', stroke: '#2A2F37', strokeWidth: '1.5', strokeLinecap: 'round' }}
      />
      {/* hood collar */}
      <path
        d="M86 122c4 12 14 18 24 18s20-6 24-18c-6-4-14-6-24-6s-18 2-24 6z"
        style={{ fill: '#252A31', stroke: 'var(--ln4)', strokeWidth: '1.5' }}
      />
      <path
        d="M102 136v18M118 136v18"
        style={{ stroke: 'var(--ac)', strokeWidth: '1.8', strokeLinecap: 'round' }}
      />
      <circle cx="102" cy="156" r="2.2" style={{ fill: 'var(--ac)' }} />
      <circle cx="118" cy="156" r="2.2" style={{ fill: 'var(--ac)' }} />
      {/* neck */}
      <path d="M102 98h16v20c-4 4-12 4-16 0z" style={{ fill: '#A8704E' }} />
      {/* ears */}
      <ellipse cx="87" cy="68" rx="4.5" ry="7" style={{ fill: '#C68A62' }} />
      <ellipse cx="133" cy="68" rx="4.5" ry="7" style={{ fill: '#C68A62' }} />
      {/* face with jawline */}
      <path
        d="M88 58c0-17 10-26 22-26s22 9 22 26v12c0 14-10 27-22 27s-22-13-22-27z"
        style={{ fill: '#C68A62' }}
      />
      <path
        d="M121 36c7 4 11 12 11 22v12c0 14-10 27-22 27 8-6 13-16 13-28V58c0-9-1-16-2-22z"
        style={{ fill: '#000', opacity: '.12' }}
      />
      {/* screen light on face */}
      <ellipse
        className="av-screenglow"
        cx="110"
        cy="84"
        rx="20"
        ry="12"
        style={{ fill: 'color-mix(in srgb, var(--ac) 18%, transparent)' }}
      />
      {/* hair with volume */}
      <path
        d="M85 62c-4-22 6-38 26-38 19 0 30 13 27 34-3-9-9-14-17-16-6 6-17 9-28 9-4 2-7 6-8 11z"
        style={{ fill: '#1E1916' }}
      />
      <path
        d="M96 30c9-5 22-4 30 3"
        style={{ fill: 'none', stroke: '#4A3F38', strokeWidth: '2', strokeLinecap: 'round' }}
      />
      {/* headphones over the head */}
      <path
        d="M84 66c0-30 11-42 26-42s26 12 26 42"
        style={{ fill: 'none', stroke: 'var(--hp)', strokeWidth: '5', strokeLinecap: 'round' }}
      />
      <rect
        x="78"
        y="58"
        width="12"
        height="21"
        rx="5.5"
        style={{ fill: 'var(--hp-deep)', stroke: 'var(--hp)', strokeWidth: '1.5' }}
      />
      <rect
        x="130"
        y="58"
        width="12"
        height="21"
        rx="5.5"
        style={{ fill: 'var(--hp-deep)', stroke: 'var(--hp)', strokeWidth: '1.5' }}
      />
      {/* eyebrows */}
      <path
        d="M94 56c3-2 8-2 11 0M115 56c3-2 8-2 11 0"
        style={{ fill: 'none', stroke: '#1E1916', strokeWidth: '2', strokeLinecap: 'round' }}
      />
      {/* glasses */}
      <rect
        x="92"
        y="59"
        width="16"
        height="12"
        rx="4"
        style={{
          fill: 'color-mix(in srgb, var(--ac) 16%, transparent)',
          stroke: '#111214',
          strokeWidth: '1.6',
        }}
      />
      <rect
        x="112"
        y="59"
        width="16"
        height="12"
        rx="4"
        style={{
          fill: 'color-mix(in srgb, var(--ac) 16%, transparent)',
          stroke: '#111214',
          strokeWidth: '1.6',
        }}
      />
      <path d="M108 64h4" style={{ stroke: '#111214', strokeWidth: '1.6' }} />
      {/* eyes looking down at the screen */}
      <ellipse className="av-eye" cx="100" cy="67" rx="1.8" ry="2" style={{ fill: '#1A1614' }} />
      <ellipse className="av-eye" cx="120" cy="67" rx="1.8" ry="2" style={{ fill: '#1A1614' }} />
      <path
        className="av-glint"
        d="M95 70l6-9M115 70l6-9"
        style={{ stroke: 'rgba(255,255,255,.55)', strokeWidth: '1.3', strokeLinecap: 'round' }}
      />
      {/* nose and smile */}
      <path
        d="M110 70c-1 5-3 8-1 9 1 1 3 1 4 0"
        style={{ fill: 'none', stroke: '#9A6446', strokeWidth: '1.4', strokeLinecap: 'round' }}
      />
      <path
        d="M104 86c3 3 9 3 12 0"
        style={{ fill: 'none', stroke: '#7A4A34', strokeWidth: '1.6', strokeLinecap: 'round' }}
      />
      {/* sleeves bending down to the keyboard, hands typing behind the lid edges */}
      <g className="av-arm">
        <path
          d="M66 138c-6 12-4 22 6 28l14 6"
          style={{ fill: 'none', stroke: '#1C2026', strokeWidth: '14', strokeLinecap: 'round' }}
        />
        <path
          d="M66 138c-6 12-4 22 6 28l14 6"
          style={{
            fill: 'none',
            stroke: 'var(--ln4)',
            strokeWidth: '1.2',
            strokeLinecap: 'round',
            opacity: '.6',
          }}
        />
        <g className="av-tap" style={{ animationDelay: '0s' }}>
          <g transform="translate(66 170) scale(1 1)">
            <path
              d="M-9 -3c2-3 6-4 10-3l7 2c2 1 2 5 0 6l-7 3c-4 1-8 0-10-3z"
              style={{ fill: '#C68A62' }}
            />
            <path
              d="M-1 -4.5c1 2 1 7 0 9"
              style={{
                fill: 'none',
                stroke: '#9A6446',
                strokeWidth: '1',
                strokeLinecap: 'round',
                opacity: '.7',
              }}
            />
            <path
              d="M3 -3.5v6M6 -2.6v4.6"
              style={{
                stroke: '#9A6446',
                strokeWidth: '.9',
                strokeLinecap: 'round',
                opacity: '.55',
              }}
            />
            <path
              d="M-11 -4.5c-1 3-1 7 0 9"
              style={{ fill: 'none', stroke: '#252A31', strokeWidth: '4', strokeLinecap: 'round' }}
            />
          </g>
        </g>
      </g>
      <g className="av-arm" style={{ animationDelay: '-.23s' }}>
        <path
          d="M154 138c6 12 4 22-6 28l-14 6"
          style={{ fill: 'none', stroke: '#1C2026', strokeWidth: '14', strokeLinecap: 'round' }}
        />
        <path
          d="M154 138c6 12 4 22-6 28l-14 6"
          style={{
            fill: 'none',
            stroke: 'var(--ln4)',
            strokeWidth: '1.2',
            strokeLinecap: 'round',
            opacity: '.6',
          }}
        />
        <g className="av-tap" style={{ animationDelay: '-.21s' }}>
          <g transform="translate(154 170) scale(-1 1)">
            <path
              d="M-9 -3c2-3 6-4 10-3l7 2c2 1 2 5 0 6l-7 3c-4 1-8 0-10-3z"
              style={{ fill: '#C68A62' }}
            />
            <path
              d="M-1 -4.5c1 2 1 7 0 9"
              style={{
                fill: 'none',
                stroke: '#9A6446',
                strokeWidth: '1',
                strokeLinecap: 'round',
                opacity: '.7',
              }}
            />
            <path
              d="M3 -3.5v6M6 -2.6v4.6"
              style={{
                stroke: '#9A6446',
                strokeWidth: '.9',
                strokeLinecap: 'round',
                opacity: '.55',
              }}
            />
            <path
              d="M-11 -4.5c-1 3-1 7 0 9"
              style={{ fill: 'none', stroke: '#252A31', strokeWidth: '4', strokeLinecap: 'round' }}
            />
          </g>
        </g>
      </g>
      {/* desk */}
      <path d="M0 186h220" style={{ stroke: 'var(--ln3)', strokeWidth: '1.5' }} />
      <rect x="0" y="186" width="220" height="14" style={{ fill: 'var(--s1)' }} />
      {/* coffee mug with steam */}
      <path
        className="av-steam"
        d="M28 150c-4-6 4-10 0-16"
        style={{ fill: 'none', stroke: 'var(--tx3)', strokeWidth: '1.5', strokeLinecap: 'round' }}
      />
      <path
        className="av-steam"
        d="M36 152c-4-6 4-10 0-16"
        style={{
          fill: 'none',
          stroke: 'var(--tx3)',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          animationDelay: '-1.2s',
        }}
      />
      <rect
        x="22"
        y="160"
        width="20"
        height="26"
        rx="4"
        style={{ fill: 'var(--mug)', stroke: 'var(--mug-edge)', strokeWidth: '1.5' }}
      />
      <path
        d="M42 166c7 0 7 12 0 12"
        style={{ fill: 'none', stroke: 'var(--mug)', strokeWidth: '2' }}
      />
      {/* little plant */}
      <g className="av-plant">
        <path d="M188 168c-3-11-10-17-17-19 3 8 8 15 17 19z" style={{ fill: '#7FAE3E' }} />
        <path d="M188 168c3-13 11-20 18-22-3 10-9 17-18 22z" style={{ fill: '#8FC04A' }} />
        <path d="M188 168c-1-14 1-25 0-32-5 9-5 22 0 32z" style={{ fill: 'var(--ac)' }} />
        <path d="M188 168c-6-6-14-8-19-6 5 4 11 6 19 6z" style={{ fill: '#6A9535' }} />
        <path d="M188 168c6-7 14-9 20-7-5 5-12 7-20 7z" style={{ fill: '#6A9535' }} />
      </g>
      <rect x="176" y="166" width="24" height="5" rx="2" style={{ fill: '#8A6550' }} />
      <path d="M178 171h20l-3 15h-14z" style={{ fill: '#7A5A44' }} />
      <path d="M180 175h16" style={{ stroke: '#000', strokeWidth: '1', opacity: '.15' }} />
      {/* laptop (back of lid facing us) */}
      <path
        className="av-lidglow"
        d="M70 128h80"
        style={{ stroke: 'var(--ac)', strokeWidth: '2', strokeLinecap: 'round' }}
      />
      <rect
        x="68"
        y="128"
        width="84"
        height="54"
        rx="6"
        style={{ fill: 'var(--s2)', stroke: 'var(--ln4)', strokeWidth: '1.5' }}
      />
      <text
        x="110"
        y="160"
        textAnchor="middle"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fill: 'var(--ac)' }}
      >
        kv
      </text>
      <path d="M58 182h104l-6 4H64z" style={{ fill: 'var(--ln3)' }} />
    </svg>
  )
}
