import localFont from 'next/font/local';

const integralCF = localFont({
  src: [
    {
      path: './integralcf-bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  fallback: ['sans-serif'],
  variable: '--font-integralCF'
});

const satoshi = localFont({
  src: [
    {
      path: './Satoshi-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Satoshi-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Satoshi-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  fallback: ['sans-serif'],
  variable: '--font-satoshi'
});

const dancingScript = localFont({
  src: [
    {
      path: './DancingScript-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './DancingScript-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './DancingScript-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './DancingScript-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  fallback: ['cursive'],
  variable: '--font-dancing-script'
});

const dmSerifText = localFont({
  src: [
    {
      path: './DMSerifText-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './DMSerifText-Italic.ttf',
      weight: '400',
      style: 'italic'
    }
  ],
  fallback: ['serif'],
  variable: '--font-dm-serif'
});

const greatVibes = localFont({
  src: [
    {
      path: './GreatVibes-Regular.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  fallback: ['cursive'],
  variable: '--font-great-vibes'
});

const pacifico = localFont({
  src: [
    {
      path: './Pacifico-Regular.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  fallback: ['cursive'],
  variable: '--font-pacifico'
});

const poppins = localFont({
  src: [
    {
      path: './Poppins-Thin.ttf',
      weight: '100',
      style: 'normal'
    },
    {
      path: './Poppins-ThinItalic.ttf',
      weight: '100',
      style: 'italic'
    },
    {
      path: './Poppins-ExtraLight.ttf',
      weight: '200',
      style: 'normal'
    },
    {
      path: './Poppins-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic'
    },
    {
      path: './Poppins-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './Poppins-LightItalic.ttf',
      weight: '300',
      style: 'italic'
    },
    {
      path: './Poppins-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Poppins-Italic.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: './Poppins-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic'
    },
    {
      path: './Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic'
    },
    {
      path: './Poppins-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic'
    },
    {
      path: './Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: './Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic'
    },
    {
      path: './Poppins-Black.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: './Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic'
    }
  ],
  fallback: ['sans-serif'],
  variable: '--font-poppins'
});

const firaSans = localFont({
  src: [
    {
      path: './FiraSans-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './FiraSans-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './FiraSans-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './FiraSans-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ],
  fallback: ['sans-serif'],
  variable: '--font-fira-sans'
});

const lora = localFont({
  src: [
    {
      path: './Lora-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Lora-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Lora-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './Lora-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './Lora-Italic.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: './Lora-MediumItalic.ttf',
      weight: '500',
      style: 'italic'
    },
    {
      path: './Lora-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic'
    },
    {
      path: './Lora-BoldItalic.ttf',
      weight: '700',
      style: 'italic'
    }
  ],
  fallback: ['serif'],
  variable: '--font-lora'
});

const vollkorn = localFont({
  src: [
    {
      path: './Vollkorn-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './Vollkorn-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './Vollkorn-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './Vollkorn-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: './Vollkorn-Italic.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: './Vollkorn-MediumItalic.ttf',
      weight: '500',
      style: 'italic'
    },
    {
      path: './Vollkorn-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic'
    },
    {
      path: './Vollkorn-BoldItalic.ttf',
      weight: '700',
      style: 'italic'
    }
  ],
  fallback: ['serif'],
  variable: '--font-vollkorn'
});

export {
  integralCF,
  satoshi,
  dancingScript,
  dmSerifText,
  greatVibes,
  pacifico,
  poppins,
  firaSans,
  lora,
  vollkorn
};
