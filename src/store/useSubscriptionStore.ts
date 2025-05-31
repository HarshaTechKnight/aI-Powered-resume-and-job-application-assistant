import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SubscriptionTier = 'free' | 'premium' | 'professional';

interface SubscriptionState {
  currentTier: SubscriptionTier;
  reviewsRemaining: number;
  expiryDate: string | null;
  setTier: (tier: SubscriptionTier) => void;
  decrementReviews: () => void;
  resetReviews: () => void;
  setExpiryDate: (date: string) => void;
}

const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      currentTier: 'free',
      reviewsRemaining: 1,
      expiryDate: null,
      setTier: (tier) => set({ currentTier: tier }),
      decrementReviews: () =>
        set((state) => ({ reviewsRemaining: Math.max(0, state.reviewsRemaining - 1) })),
      resetReviews: () => set({ reviewsRemaining: 1 }),
      setExpiryDate: (date) => set({ expiryDate: date }),
    }),
    {
      name: 'subscription-storage',
    }
  )
);

export default useSubscriptionStore;