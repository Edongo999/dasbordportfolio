import React, { useState } from "react";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import SidebarNotifications from "./SidebarNotifications";
import SidebarProfile from "./SidebarProfile";
import PublishArticleModal from "@/components/articles/PublishArticleModal";
import { ArticleManage } from "@/components/types/ArticleManage";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
  onAddArticle: (article: ArticleManage) => void;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  onRefresh,
  onAddArticle,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [openPublishModal, setOpenPublishModal] = useState(false);

  return (
    <>
      {/* ================================
          DESKTOP
      ================================= */}

      <SidebarDesktop
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onOpenPublish={() => setOpenPublishModal(true)}
      >
        <SidebarProfile />
        <SidebarNotifications />
      </SidebarDesktop>

      {/* ================================
          MOBILE
      ================================= */}

      {mobileOpen && (
        <SidebarMobile
          setMobileOpen={setMobileOpen}
          onOpenPublish={() => setOpenPublishModal(true)}
        >
          <SidebarProfile />
          <SidebarNotifications />
        </SidebarMobile>
      )}

      {/* ================================
          MODAL PUBLICATION
      ================================= */}

      <PublishArticleModal
        open={openPublishModal}
        onClose={() => setOpenPublishModal(false)}
        onPublish={(article) => {
          const normalizedArticle: ArticleManage = {
            ...article,

            // Laravel peut renvoyer 0 / 1
            // On convertit proprement en boolean
            archived: Boolean(article.archived),

            // Si aucune image
            image: article.image ?? null,
          };

          onAddArticle(normalizedArticle);
        }}
        onRefresh={onRefresh}
      />
    </>
  );
}
