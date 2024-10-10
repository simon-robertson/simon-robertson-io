import { Recommend } from "@/components/icons/recommend"

import { PageSection } from "@/components/page-section"

export function PreferencesSection() {
    return (
        <PageSection heading="Preferences" edge={<Recommend />}>
            <p>
                Even though I am a full-stack developer, I have always preferred working with
                frontend web technologies. React, or something related such as NextJS, are my
                preferred tools for web-based applications. Ultimately, it depends on the
                requirements though. For small, static websites, I tend to reach for Vite and
                vanilla JavaScript and CSS.
            </p>
            <p>
                When it comes to hosting and database services, I am a fan of Vercel and Turso.
                Vercel makes website deployment frictionless, even when NextJS is not being used,
                while Turso provides fast SQLite databases with some very nice features.
            </p>
        </PageSection>
    )
}
