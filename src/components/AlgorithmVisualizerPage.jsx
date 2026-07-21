// Copyright (c) 2026 Saheli Mondal.

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categories from "@/data/categories";
import {
  FullScreenModalArray,
  FullScreenModalLinkedList,
  FullScreenModalSorting,
  ArrayDetails,
  LinkedListDetails,
  SortingDetails,
} from "@/components/algorithm-visualizer-details";
import {
  algorithmSlug,
  getAlgorithmPath,
  getCategoryIdFromSegment,
  getCategoryPath,
  isInteractiveAlgorithm,
  recordRecentlyViewedAlgorithm,
} from "@/utils/algorithmRoutes";
import NotFound from "@/components/NotFound";

const AlgorithmVisualizerPage = () => {
  const {
    category: categorySegment,
    algorithm: algorithmSegment,
    view,
  } = useParams();
  const navigate = useNavigate();
  const categoryId = getCategoryIdFromSegment(categorySegment);
  const topic = categoryId ? categories[categoryId] : null;
  const algorithm = topic?.algorithms.find(
    (item) => algorithmSlug(item.name) === algorithmSegment
  );
  const isAvailable = algorithm && isInteractiveAlgorithm(algorithm.name);
  const isVisualizationPage = view === "visualize";
  const isDetailsPage = !view || view === "details";

  useEffect(() => {
    if (isAvailable && (isDetailsPage || isVisualizationPage)) {
      const pageLabel = isVisualizationPage ? "Visualizer" : "Details";
      const pageTitle = `${algorithm.name} ${pageLabel} | Visco`;
      const description = isVisualizationPage
        ? `Run and control a step-by-step ${algorithm.name} visualization on Visco.`
        : `Learn ${algorithm.name}: how it works, its complexity, implementation, and example walkthroughs on Visco.`;
      const pageUrl = `${window.location.origin}${window.location.pathname}`;

      document.title = pageTitle;
      recordRecentlyViewedAlgorithm(categoryId, algorithm.name);

      const setMeta = (selector, attributes, content) => {
        let tag = document.head.querySelector(selector);
        if (!tag) {
          tag = document.createElement("meta");
          Object.entries(attributes).forEach(([key, value]) =>
            tag.setAttribute(key, value),
          );
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };

      setMeta('meta[name="description"]', { name: "description" }, description);
      setMeta('meta[name="robots"]', { name: "robots" }, "index, follow");
      setMeta('meta[property="og:title"]', { property: "og:title" }, pageTitle);
      setMeta('meta[property="og:description"]', { property: "og:description" }, description);
      setMeta('meta[property="og:type"]', { property: "og:type" }, "website");
      setMeta('meta[property="og:url"]', { property: "og:url" }, pageUrl);
      setMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "Visco");
      setMeta('meta[property="og:image"]', { property: "og:image" }, `${window.location.origin}/assets/brand.png`);
      setMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary");
      setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, pageTitle);
      setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
      setMeta('meta[name="twitter:image"]', { name: "twitter:image" }, `${window.location.origin}/assets/brand.png`);

      let canonicalTag = document.head.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", pageUrl);

      let structuredData = document.getElementById("visco-algorithm-schema");
      if (!structuredData) {
        structuredData = document.createElement("script");
        structuredData.id = "visco-algorithm-schema";
        structuredData.type = "application/ld+json";
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: pageTitle,
        description,
        url: pageUrl,
        educationalLevel: algorithm.difficulty,
        learningResourceType: isVisualizationPage
          ? "Interactive visualization"
          : "Algorithm guide",
        isPartOf: {
          "@type": "WebSite",
          name: "Visco",
          url: window.location.origin,
        },
      });
    }
  }, [
    algorithm?.name,
    categoryId,
    isAvailable,
    isDetailsPage,
    isVisualizationPage,
  ]);

  if (!isAvailable || (!isDetailsPage && !isVisualizationPage)) {
    return <NotFound />;
  }

  if (isDetailsPage) {
    const DetailsComponent =
      categoryId === "array"
        ? ArrayDetails
        : categoryId === "linkedList"
          ? LinkedListDetails
          : SortingDetails;

    return (
      <main className="min-h-screen bg-gray-100">
        <DetailsComponent algorithm={algorithm} topic={topic} />
      </main>
    );
  }

  const handleClose = () => navigate(getCategoryPath(categoryId));
  const modalProps = {
    isOpen: true,
    onClose: handleClose,
    initialTab: 0,
    onAlgorithmChange: (nextAlgorithm) => {
      const nextPath = getAlgorithmPath(categoryId, nextAlgorithm.name);
      navigate(isVisualizationPage ? `${nextPath}/visualize` : `${nextPath}/details`);
    },
    algorithm,
    topic,
  };

  if (categoryId === "array") return <FullScreenModalArray {...modalProps} />;
  if (categoryId === "linkedList") {
    return <FullScreenModalLinkedList {...modalProps} />;
  }

  return <FullScreenModalSorting {...modalProps} />;
};

export default AlgorithmVisualizerPage;
