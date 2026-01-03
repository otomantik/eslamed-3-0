'use client';

import { useEffect } from 'react';

interface GlossaryTerm {
  term: string;
  definition: string;
  externalUrl?: string;
  source?: string;
}

interface MedicalGlossaryProps {
  terms: GlossaryTerm[];
  title?: string;
}

/**
 * MedicalGlossary: LSI term enrichment for semantic SEO
 * Uses <dl>, <dt>, <dd> semantic HTML for proper glossary markup
 * Links to authoritative sources with rel="nofollow" to signal research depth
 * Implements schema.org/DefinedTerm for entity graph compliance
 */
export function MedicalGlossary({ terms, title = 'Terimler ve Kavramlar' }: MedicalGlossaryProps) {
  if (!terms || terms.length === 0) return null;

  // Generate schema.org/DefinedTerm JSON-LD for each term
  // Use unique @id anchors (e.g., #term-saturation) for entity graph compliance
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: title,
    hasDefinedTerm: terms.map((item) => {
      // Generate unique anchor ID: term-{lowercase-sanitized-term} (e.g., #term-saturation)
      const termSlug = item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const termId = `#term-${termSlug}`;
      const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : 'https://www.eslamed.com';
      
      return {
        '@type': 'DefinedTerm',
        '@id': `${baseUrl}${termId}`,
        name: item.term,
        description: item.definition,
        url: `${baseUrl}${termId}`,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: title,
        },
        ...(item.externalUrl && {
          sameAs: item.externalUrl,
        }),
      };
    }),
  };

  useEffect(() => {
    // Inject schema into page head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(definedTermSchema);
    script.id = 'medical-glossary-schema';
    
    // Remove existing schema if present
    const existing = document.getElementById('medical-glossary-schema');
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById('medical-glossary-schema');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [terms, title]);

  return (
    <section className="py-10 bg-slate-50" id="medical-glossary">
      <div className="container-wide">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">{title}</h2>
        <dl className="space-y-6">
          {terms.map((item, index) => {
            // Generate unique anchor ID matching schema @id format: term-{lowercase-sanitized-term}
            const termSlug = item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const termId = `term-${termSlug}`;
            
            // Alternate background for "ladder" effect
            const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30';
            
            return (
              <div
                key={index}
                id={termId}
                className={`rounded-xl border-l-4 border-blue-500/20 border border-slate-200 ${bgClass} p-7 transition-all hover:shadow-md hover:border-blue-500/40`}
              >
                <dt className="text-lg font-semibold text-slate-900 mb-2">
                  <a href={`#${termId}`} className="hover:underline" aria-label={`${item.term} tanımına git`}>
                    {item.term}
                  </a>
                </dt>
                <dd className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  {item.definition}
                  {item.externalUrl && (
                    <span className="ml-2">
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium text-sm"
                        aria-label={`${item.term} hakkında ${item.source || 'daha fazla bilgi'} (yeni sekme)`}
                      >
                        {item.source ? `Kaynak: ${item.source}` : 'Kaynak'}
                        <span className="ml-1" aria-hidden="true">↗</span>
                      </a>
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

