import {useEffect, useState} from 'react';
import CodePush from 'react-native-code-push';
import type {DownloadProgress, LocalPackage} from 'react-native-code-push';

function useCodePush() {
  const [hasUpdate, setHasUpdate] = useState(true);
  const [syncProgress, setSyncProgress] = useState<DownloadProgress>();

  useEffect(() => {
    const checkCodePush = async () => {
      try {
        const update = await CodePush.checkForUpdate();

        if (update && update?.isMandatory) {
          update
            .download((progress: DownloadProgress) => setSyncProgress(progress))
            .then((newPackage: LocalPackage) =>
              newPackage
                .install(CodePush.InstallMode.IMMEDIATE)
                .then(() => CodePush.restartApp()),
            );
          return;
        }

        setHasUpdate(false);
        return;
      } catch {
        setHasUpdate(false);
      }
    };

    checkCodePush();
  }, []);

  return {hasUpdate, syncProgress};
}

export default useCodePush;
