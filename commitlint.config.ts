const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'prefix-backlog': [2, 'always'],
    'type-empty': [0, 'never'],
    'subject-empty': [0, 'never'],
  },
  plugins: [
    {
      rules: {
        'prefix-backlog': ({ raw }: { raw: string }) => {
          const prefixPattern = /\[CHORE|FIX|FEATURE|RELEASE|TASK-\d+\]: [A-Z0-9[]/;
          return [
            prefixPattern.test(raw),
            `Your subject should contain ${prefixPattern} message. Example "[TASK-ID]: Commit message"`,
          ];
        },
      },
    },
  ],
};

export default config;
